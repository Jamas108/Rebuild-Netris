# Gunakan image node sebagai dasar
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh kode aplikasi ke dalam direktori kerja
COPY . .

# Jalankan aplikasi
CMD ["npm", "start"]