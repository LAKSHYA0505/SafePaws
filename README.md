# 🐾 SafePaws – Stray Dog Reporting System

SafePaws is a community-driven web application designed to help citizens report stray dog sightings, track issues, upload images, and collaborate with NGOs/government organizations for animal welfare.

This project uses:
- **Next.js (App Router) + Tailwind CSS** for frontend
- **Node.js + Express** for backend API
- **MongoDB (Mongoose)** as database
- **Cloudinary** for image storage

---

## 🚀 Features

- Report stray dogs with images, location, description, and severity  
- Store reports in MongoDB  
- Upload images directly to Cloudinary  
- Auto-redirect & submission confirmation  
- Scalable backend API  
- Clean, modern UI built with Next.js + Tailwind  

---

## 📁 Folder Structure

```
SafePaws/
│
├── frontend/     # Next.js 14 (App Router) frontend
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── backend/      # Node.js + Express API server
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Prerequisites

Make sure you have installed:

- Node.js (>= 18)
- npm or pnpm or yarn  
- MongoDB Atlas account  
- Cloudinary account  

---

# 🛠️ Setup Instructions (For Teammates)

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SafePaws.git
cd SafePaws
```

---

# 👉 FRONTEND SETUP (Next.js)

## 2️⃣ Install frontend dependencies

```bash
cd frontend
npm install
```

## 3️⃣ Create a `.env.local` file inside `/frontend`

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=safepaws_upload
```

## 4️⃣ Run the frontend

```bash
npm run dev
```

Your frontend will run at:

👉 http://localhost:3000

---

# 👉 BACKEND SETUP (Node.js + Express)

## 5️⃣ Install backend dependencies

```bash
cd ../backend
npm install
```

## 6️⃣ Create a `.env` file inside `/backend`

```
MONGO_URI=your_mongodb_connection_url
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 7️⃣ Start the backend server

```bash
npm start
```

Backend will run at:

👉 http://localhost:5000

---

# 🔗 Connecting Frontend & Backend

The frontend reads API routes using:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

So keep **both servers running**.

---

# ✔️ How to Submit a Report

1. Go to `/report`  
2. Fill the form  
3. Upload dog image → auto-uploads to Cloudinary  
4. Submit → API saves report to MongoDB  
5. Success message appears  

---

# 👥 Contributing (For teammates)

1. Create a new branch for your feature:

```bash
git checkout -b feature-branch-name
```

2. Make changes & commit:

```bash
git commit -m "Added new feature"
```

3. Push your branch:

```bash
git push origin feature-branch-name
```

---

# ❗ Troubleshooting

### **Node modules missing?**
Run:

```
npm install
```

### **MongoDB not connecting?**
Check your `MONGO_URI` in `.env`.

### **Images not uploading?**
Ensure Cloudinary env variables are correct.

---

# ⭐ Project Status

This project is in early development and actively growing.  
More features coming soon:  
- Map view  
- Live analytics  
- NGO dashboard  
- Report filtering  

---

# 🐶 Made with ❤️ for Animal Welfare

SafePaws is a mission to make streets safer for both people and animals.

---

