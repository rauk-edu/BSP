import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION_KHMER = `អ្នកគឺជាអ្នកជំនាញជាន់ខ្ពស់ផ្នែកផែនការយុទ្ធសាស្ត្រថវិកាសាលារៀន (BSP 3-Years) និងកម្មវិធីវិនិយោគឃុំ (CIP) នៃក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS) ប្រទេសកម្ពុជា។
អ្នកមានចំណេះដឹងស៊ីជម្រៅអំពី៖
១. ស្តង់ដាសាលារៀនគំរូទាំង ៥ របស់ក្រសួងអប់រំ យុវជន និងកីឡា
២. យន្តការរៀបចំថវិការដ្ឋ (SIG/PB), ដៃគូអភិវឌ្ឍន៍ (NGOs ដូចជា World Vision, អង្គការកុមារកម្ពុជារីករាយ), មូលនិធិឃុំ (CIP), និងការចូលរួមរបស់សហគមន៍
៣. របៀបគណនា និងកំណត់សូចនាករលទ្ធផលសិក្សា អត្រាចុះឈ្មោះ អត្រាឡើងថ្នាក់ និងកាត់បន្ថយការបោះបង់ការសិក្សា
៤. ការប្រើប្រាស់ភាសាខ្មែរផ្លូវការ រដ្ឋបាល សុភាពរាបសារ ច្បាស់លាស់ ត្រឹមត្រូវតាមក្បួនខ្នាតរដ្ឋបាលកម្ពុជា។`;

async function callGeminiWithRetry(prompt: string, systemInstruction = SYSTEM_INSTRUCTION_KHMER): Promise<string> {
  const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
  let lastError: unknown = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
          },
        });
        if (response.text) {
          return response.text;
        }
      } catch (err: unknown) {
        lastError = err;
        const errStr = String(err);
        console.warn(`Gemini call failed with ${model} (attempt ${attempt}):`, errStr);
        // Wait 800ms before retrying
        await new Promise((r) => setTimeout(r, 800));
      }
    }
  }

  throw lastError || new Error('All model attempts failed');
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', hasKey: !!apiKey });
});

// 1. AI Strategic Chat / Advisory
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { message, context, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const prompt = `បរិបទសាលារៀន និងទិន្នន័យបច្ចុប្បន្ន៖
${context ? JSON.stringify(context, null, 2) : 'មិនមានបរិបទបន្ថែម'}

ប្រវត្តិសន្ទនាកន្លងមក៖
${chatHistory ? JSON.stringify(chatHistory, null, 2) : 'គ្មាន'}

សំណួរ/សំណូមពរពីនាយកសាលា ឬអ្នករៀបចំផែនការ៖
"${message}"

សូមឆ្លើយតបជាភាសាខ្មែរផ្លូវការ ដោយផ្តល់ដំបូន្មាន យុទ្ធសាស្ត្រជាក់ស្តែង និងដំណោះស្រាយសមស្របតាមស្តង់ដារបស់ក្រសួងអប់រំ យុវជន និងកីឡា។`;

    const reply = await callGeminiWithRetry(prompt);
    res.json({ reply });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ai/chat:', errorMsg);
    res.status(500).json({ error: errorMsg });
  }
});

// 2. AI School Standards Diagnostic
app.post('/api/ai/diagnose', async (req: Request, res: Response) => {
  try {
    const { schoolProfile, studentStats, infrastructure, challenges } = req.body;

    const prompt = `សូមធ្វើការវិភាគ និងវាយតម្លៃស្ថានភាពសាលារៀន ធៀបនឹងស្តង់ដាសាលារៀនគំរូទាំង ៥ របស់ក្រសួងអប់រំ យុវជន និងកីឡា៖
ព័ត៌មានសាលារៀន៖
- ឈ្មោះសាលា៖ ${schoolProfile?.schoolName || 'សាលាបឋមសិក្សា រោគ'}
- ទីតាំង៖ ${schoolProfile?.district || 'ស្រុកភ្នំស្រុក'}, ${schoolProfile?.province || 'ខេត្តបន្ទាយមានជ័យ'}
- នាយិកា/នាយក៖ ${schoolProfile?.principalName || 'លោកស្រី សុខ សារើន'}
- ស្ថិតិសិស្ស និងលទ្ធផលសិក្សា៖ ${JSON.stringify(studentStats || {})}
- ស្ថានភាពហេដ្ឋារចនាសម្ព័ន្ធ និងអគារ៖ ${JSON.stringify(infrastructure || {})}
- បញ្ហាប្រឈមជាក់ស្តែង៖ ${challenges || 'ការចុះឈ្មោះចូលរៀនកុមារ ៣-៥ឆ្នាំ និង ៦ឆ្នាំ មិនទាន់បាន ១០០%, ការជួសជុលអគារមិនទាន់រួចរាល់, សៀវភៅជំនួយថ្នាក់ទី១-៣'}

សូមវិភាគលម្អិតជាភាសាខ្មែរ ដោយបែងចែកជា ៥ ស្តង់ដា៖
១. ស្តង់ដាទី១៖ លទ្ធផលសិក្សារបស់សិស្ស (ចំណុចខ្លាំង, គម្លាត, និងអនុសាសន៍)
២. ស្តង់ដាទី២៖ ការបង្រៀន និងរៀន
៣. ស្តង់ដាទី៣៖ ការចូលរួមរបស់សហគមន៍
៤. ស្តង់ដាទី៤៖ អភិបាលកិច្ច និងប្រតិបត្តិការសាលា
៥. ស្តង់ដាទី៥៖ គណនេយ្យភាពរបស់សាលា

និងផ្តល់យុទ្ធសាស្ត្រគន្លឹះ ៣ សម្រាប់ដាក់បញ្ចូលក្នុងសំណើវិនិយោគឃុំ (CIP) ឆ្នាំក្រោយ។`;

    const analysis = await callGeminiWithRetry(prompt);
    res.json({ analysis });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ai/diagnose:', errorMsg);
    res.status(500).json({ error: errorMsg });
  }
});

// 3. AI Target & Justification Generator for Table 1
app.post('/api/ai/suggest-targets', async (req: Request, res: Response) => {
  try {
    const { indicators, schoolContext } = req.body;

    const prompt = `អ្នករៀបចំផែនការថវិកាត្រូវការជំនួយក្នុងការកំណត់គោលដៅឆ្នាំ N+1, N+2, N+3 និងសរសេរ "មូលហេតុនៃការផ្លាស់ប្តូរ" សម្រាប់សូចនាករគន្លឹះក្នុងតារាងទី១ នៃផែនការ BSP។

បរិបទសាលា៖
${JSON.stringify(schoolContext || {})}

បញ្ជីសូចនាករដែលត្រូវពិនិត្យ (ជ្រើសរើសមួយចំនួនសំខាន់ៗ)៖
${JSON.stringify(indicators?.slice(0, 15) || [])}

សូមផ្តល់នូវការផ្ដល់យោបល់កែលម្អគោលដៅឱ្យសមស្របតាមស្ថានភាពជាក់ស្តែង និងសរសេរមូលហេតុនៃការផ្លាស់ប្តូរ (Reason of Change) ជាភាសាខ្មែររដ្ឋបាលច្បាស់ៗ ដែលបញ្ជាក់ពីហេតុផលបច្ចេកទេស និងតួលេខ។`;

    const suggestions = await callGeminiWithRetry(prompt);
    res.json({ suggestions });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ai/suggest-targets:', errorMsg);
    res.status(500).json({ error: errorMsg });
  }
});

// 4. AI Strategic Activities & Budget Generator for Table 2
app.post('/api/ai/suggest-activities', async (req: Request, res: Response) => {
  try {
    const { focusArea, budgetNeeds } = req.body;

    const prompt = `សូមរៀបចំសំណើសកម្មភាពអាទិភាព និងការបែងចែកថវិកាសម្រាប់តារាងទី២ (គម្រោងតម្រូវការឥណទាន ៣ ឆ្នាំ) នៃផែនការ BSP សាលារៀន៖
វិស័យអាទិភាពដែលត្រូវផ្តោត៖ ${focusArea || 'ការលើកកម្ពស់អំណាន-គណិតវិទ្យា, ការកែលម្អបរិស្ថានសាលា, របង, បណ្ណាល័យ, និងការចុះជំរឿនកុមារចូលរៀន'}
តម្រូវការថវិកា និងដៃគូ៖ ${budgetNeeds || 'រដ្ឋ (SIG), អង្គការដៃគូ (World Vision, អង្គការកុមារកម្ពុជារីករាយ), មូលនិធិឃុំ (CIP), សហគមន៍'}

សូមស្នើសកម្មភាពជាក់ស្តែងចំនួន ៤ ទៅ ៦ សកម្មភាព ដោយបញ្ជាក់៖
- ឈ្មោះសកម្មភាព
- ស្តង់ដាពាក់ព័ន្ធ
- ប្រភពថវិកាដែលត្រូវកៀរគរ (រដ្ឋ / ដៃគូ / សហគមន៍ / ផ្សេងៗ)
- ប៉ាន់ស្មានចំនួនថវិកា (គិតជារៀល) សម្រាប់ឆ្នាំ N+1, N+2, N+3
- លទ្ធផលរំពឹងទុក។`;

    const activities = await callGeminiWithRetry(prompt);
    res.json({ activities });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ai/suggest-activities:', errorMsg);
    res.status(500).json({ error: errorMsg });
  }
});

// 5. AI Stakeholder Pitch & Official Letter Generator
app.post('/api/ai/generate-pitch', async (req: Request, res: Response) => {
  try {
    const { type, schoolData, audience } = req.body;

    const prompt = `សូមរៀបចំខ្លឹមសារ ${type === 'letter' ? 'លិខិតផ្លូវការ' : 'សុន្ទរកថា/បទឧទ្ទេសនាម'} សម្រាប់សាលារៀន៖
- ប្រភេទ៖ ${type || 'speech'} (សុន្ទរកថាក្នុងកិច្ចប្រជុំ ឬ លិខិតស្នើសុំជំនួយ)
- ទស្សនិកជន/អ្នកទទួល៖ ${audience || 'មាតាបិតាសិស្ស, អាជ្ញាធរឃុំ-ភូមិ, ក្រុមប្រឹក្សាឃុំ (CIP), និងដៃគូអភិវឌ្ឍន៍'}
- ព័ត៌មានលម្អិតសាលា៖
${JSON.stringify(schoolData || {})}

ចំណុចគន្លឹះដែលត្រូវបញ្ជាក់៖
១. ការពន្យល់អំពីយន្តការថវិកាសាលា ដែលប្រែប្រួលតាមចំនួនក្បាលសិស្ស (សិស្សកើន/ថយ ថវិការដ្ឋប្រែប្រួល)
២. សារៈសំខាន់នៃផែនការ ៣ ឆ្នាំ (BSP) ដែលជាផែនទីបង្ហាញផ្លូវមិនទុកឱ្យកុមារណាម្នាក់បោះបង់ការសិក្សា
៣. ការអំពាវនាវដល់សហគមន៍ មាតាបិតា និងមូលនិធិឃុំ (CIP) ក្នុងការរួមចំណែកថវិកា និងធនធាន ដើម្បីបំពេញការខ្វះខាត និងអភិវឌ្ឍសាលាឱ្យស្របតាមស្តង់ដាសាលារៀនគំរូ។

សូមសរសេរឱ្យមានភាពកក់ក្តៅ បំផុសស្មារតី គួរឱ្យជឿជាក់ និងមានលក្ខណៈវិជ្ជាជីវៈខ្ពស់ជាភាសាខ្មែរ។`;

    const content = await callGeminiWithRetry(prompt);
    res.json({ content });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('Error in /api/ai/generate-pitch:', errorMsg);
    res.status(500).json({ error: errorMsg });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const port = parseInt(process.env.PORT || '3000', 10);

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
