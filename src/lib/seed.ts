// seed.ts

import { FeedType } from "@/components/inki";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const feedData: FeedType[] = [
  {
    id: 1,
    title: "Permasalahan dalam Sistem Pendidikan",
    content:
      "Pendidikan di beberapa daerah di Jawa Barat masih menghadapi tantangan serius. Banyak sekolah yang kekurangan fasilitas, guru yang kurang terlatih, dan kurangnya dukungan pemerintah. Hal ini mempengaruhi kualitas pendidikan anak-anak di wilayah tersebut.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 75,
    commentCount: 50,
    createdAt: 1674034296,
    link: "/education-issue",
    province: "Jawa Barat",
  },

  {
    id: 2,
    title: "Krisis Air Bersih di Jawa Barat",
    content:
      "Beberapa wilayah di Jawa Barat menghadapi krisis air bersih yang serius. Sumber air terbatas dan kualitas air yang buruk menyebabkan banyak penduduk kesulitan mendapatkan akses air bersih yang layak. Pemerintah setempat perlu segera mengatasi permasalahan ini untuk meningkatkan kesejahteraan masyarakat.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 90,
    commentCount: 80,
    createdAt: 1674021296,
    link: "/water-crisis",
    province: "Jawa Barat",
  },

  {
    id: 3,
    title: "Ketidaksetaraan Akses Internet",
    content:
      "Sebagian besar wilayah pedesaan di Jawa Barat mengalami ketidaksetaraan akses internet. Ini menghambat pertumbuhan ekonomi dan pendidikan di daerah tersebut. Perlu adanya upaya untuk meningkatkan infrastruktur dan ketersediaan akses internet yang merata.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 80,
    commentCount: 60,
    createdAt: 1674094296,
    link: "/internet-access",
    province: "Jawa Barat",
  },

  {
    id: 4,
    title: "Kurangnya Lapangan Pekerjaan",
    content:
      "Tingginya tingkat pengangguran di beberapa kota di Jawa Barat menjadi permasalahan utama. Diperlukan langkah-langkah untuk meningkatkan investasi dan menciptakan lapangan pekerjaan agar masyarakat dapat memperoleh penghidupan yang lebih baik.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 85,
    commentCount: 70,
    createdAt: 1674012396,
    link: "/job-employment",
    province: "Jawa Barat",
  },

  {
    id: 5,
    title: "Banjir di Jakarta",
    content:
      "Banjir tahunan di Jakarta mengakibatkan kerugian ekonomi dan membahayakan warga. Penyebab utamanya adalah buruknya drainase dan alih fungsi lahan. Pemerintah harus mengambil langkah untuk memperbaiki sistem drainase dan mencegah alih fungsi lahan.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 60,
    commentCount: 35,
    createdAt: 1674098296,
    link: "/jakarta-flood",
    province: "DKI Jakarta",
  },

  {
    id: 6,
    title: "Limbah Industri di Kalimantan",
    content:
      "Pencemaran lingkungan akibat limbah industri batu bara dan sawit di Kalimantan telah merusak ekosistem hutan dan sungai. Diperlukan pengawasan dan aturan yang lebih ketat terhadap pembuangan limbah industri untuk melindungi lingkungan di sana.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 85,
    commentCount: 100,
    createdAt: 1674018396,
    link: "/industry-waste",
    province: "Kalimantan",
  },

  {
    id: 7,
    title: "Kemiskinan di NTT",
    content:
      "Tingkat kemiskinan yang tinggi di Nusa Tenggara Timur menjadi masalah serius yang harus segera ditangani. Rendahnya akses pendidikan, kesehatan, dan lapangan pekerjaan menjadi penyebab utamanya. Diperlukan program-program pengentasan kemiskinan yang tepat sasaran di daerah ini.",
    image: "https://via.placeholder.com/640x480.png/c9c9c9/000000?Text=640x480",
    score: 90,
    commentCount: 120,
    createdAt: 1674089196,
    link: "/poverty-ntt",
    province: "Nusa Tenggara Timur",
  },
];

const seedDatabase = async () => {
  for (const data of feedData) {
    console.log(`Creating feed ${data.id}`);
    await prisma.feed.create({
      data,
    });
  }
};

seedDatabase()
  .catch((error) => {
    console.error("Error seeding database:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
