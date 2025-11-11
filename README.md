# 🚀 AI OPS - HR Management System

A modern, AI-powered Human Resources Management System that streamlines recruitment processes with intelligent candidate screening, job description generation, and interview preparation.

## ✨ Features

### 🤖 AI-Powered Candidate Screening
- Upload multiple CV/Resume files (PDF format) simultaneously
- Automated CV parsing and candidate profile extraction
- AI-based scoring system (0-100) for candidate evaluation
- Detailed analysis including strengths, weaknesses, and hiring recommendations
- Custom job requirements support for precise candidate matching
- Track which position each candidate applied for

### 📝 Job Description Generator
- AI-generated professional job descriptions
- Customizable requirements and specifications
- Modern, engaging content that attracts top talent

### 💬 Interview Questions Generator
- AI-curated interview questions tailored to specific roles
- Mix of behavioral, technical, and situational questions
- Save time on interview preparation

### 📊 Dashboard & Analytics
- Real-time candidate statistics
- Visual score indicators with color coding
- Expandable candidate cards with detailed information
- Clean, modern UI/UX design

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (via CDN)
- **AI Model:** Google Gemini 2.5 Flash
- **PDF Processing:** PDF.js
- **Deployment:** Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-ops-hr-management.git
   cd ai-ops-hr-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
   
   Or copy from the example file:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ai-ops-hr-management)

#### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel
   ```

3. **Set environment variables in Vercel**
   
   Go to your Vercel project settings → Environment Variables → Add:
   - Key: `API_KEY`
   - Value: Your Gemini API key

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Google Gemini API Key | Yes |

## 📝 Usage

### Screening Candidates

1. Click the **"AI Assistant"** button in the top-right corner
2. Select **"AI Screening Ứng viên"**
3. Enter the job title (e.g., "Senior Frontend Developer")
4. Optionally add special requirements
5. Upload one or multiple PDF CV files
6. Click **"Start Screening"**
7. View results in the dashboard with AI scores and detailed analysis

### Generating Job Descriptions

1. Click **"AI Assistant"** → **"Tạo Job Description"**
2. Enter the job title
3. Add any specific requirements (optional)
4. Click **"Generate"**
5. Copy and use the generated job description

### Creating Interview Questions

1. Click **"AI Assistant"** → **"Câu hỏi Phỏng vấn"**
2. Enter the position name
3. Get 10-15 tailored interview questions instantly

## 🎨 Project Structure

```
ai-ops-hr-management/
├── components/           # React components
│   ├── AIAssistantModal.tsx
│   ├── CandidateCard.tsx
│   ├── Header.tsx
│   ├── ScreeningView.tsx
│   ├── JDGeneratorView.tsx
│   ├── InterviewQuestionsView.tsx
│   └── StatCard.tsx
├── services/            # API services
│   └── geminiService.ts
├── constants.tsx        # SVG icons and constants
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main app component
├── index.tsx           # App entry point
├── index.css           # Global styles
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- PDF parsing with [PDF.js](https://mozilla.github.io/pdf.js/)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ for modern HR teams
