import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { NativeBaseProvider, Box, Text, VStack, Button, ScrollView, Heading, FlatList } from "native-base";
import { Header } from "../components";

// Fungsi untuk memangkas deskripsi
const truncateText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Article = ({ navigation }) => {
  const [articles, setArticles] = useState([
    {
      id: 0,
      title: "Metode Tambal Ban Mobil, Apa Saja dan Berapa Kisaran Harga?",
      description: "Pastikan Anda tahu yang terbaik untuk kendaraan Anda. Yuk, simak!",
      image: require("../assets/slide1.png"),
      fullArticle: "Terdapat beberapa jenis tambal ban mobil, termasuk patch, plug and patch, dan tire seal string. Patch adalah metode paling murah, namun kurang tahan lama. Plug and patch lebih tahan lama dengan harga lebih mahal. Tire seal string adalah pilihan untuk ban tubeless, tetapi kurang disarankan karena bisa merusak bagian tapak ban dan tidak terlalu awet. Ketika memilih tempat tambal ban, pastikan tempatnya aman, perhatikan cara menambal yang benar, dan tanyakan harga terlebih dahulu. Hindari tempat tambal ban sembarangan untuk menghindari masalah lebih lanjut.",
      //   url: "https://wuling.id/id/blog/autotips/metode-tambal-ban-mobil-apa-saja-dan-berapa-kisaran-harga",
    },
    {
      id: 1,
      title: "Tiga Metode Tambal Ban Tubeless, Mana yang Paling Baik?",
      description: "Pengguna ban tubeless wajib tahu bila ada tiga metode umum menambal saat mengalami kebocoran di jalan",
      image: require("../assets/slide1.png"),
      fullArticle: "Metode tambal ban untuk ban tubeless meliputi tip top, cacing, dan payung. Cacing adalah cara yang praktis, murah, namun tidak ramah terhadap karet ban karena bisa merusak struktur. Tambal ban payung lebih rumit, memerlukan pelek dilepas, tapi hasilnya kuat. Tambal ban tip top menggunakan mesin pres tanpa payung, cocok untuk kebocoran samping karena menyatu dengan baik.",
      //   url: "https://otomotif.kompas.com/read/2022/09/23/074200715/tiga-metode-tambal-ban-tubeless-mana-yang-paling-baik-",
    },
    {
      id: 2,
      title: "Ban Ini Bikin Pengusaha Tambal Ban Gulung Tikar!",
      description: "Ada kabar baik untuk semua, sekarang udah ada teknologi ban antibocor, lho! Yuk kenalan sama ban satu ini!",
      image: require("../assets/slide2.png"),
      fullArticle: "Robert W. Thompson menciptakan ban pneumatik pada 1847, tetapi John Boyd Dunlop yang mempopulerkannya pada 1888. JV Martin menciptakan ban tanpa udara pada 1930-an, tetapi tidak dikomersialkan. Baru pada abad ke-21, Michelin mengembangkan ban tanpa udara yang disebut UPTIS  (Unique Puncture-proof Tire System). UPTIS memiliki dinding penyangga untuk optimalisasi suspensi dan terbuat dari kombinasi karet, aluminium, dan serat kaca. Ramah lingkungan karena menggunakan bahan mentah lebih sedikit. Diuji coba pada mobil van DHL Express dan rencananya akan diproduksi massal tahun 2025.",
      //   url: "https://newfemme.co/id/artikel/detail/2896/ban-ini-bikin-pengusaha-tambal-ban-gulung-tikar",
    },
    {
      id: 3,
      title: "Tukang Tambal Ban Respons Kehadiran Ban Tanpa Udara",
      description: "Sejumlah penyedia jasa tambal ban merespons kehadiran ban tanpa udara atau Unique Puncture-proof Tire System (Uptis).",
      image: require("../assets/slide3.png"),
      fullArticle: "Penyedia jasa reparasi ban seperti Mariu optimistis menghadapi perkembangan teknologi ban tanpa udara seperti UPTIS. Meski ban tanpa udara menjadi inovasi yang akan populer, Mariu yakin masih akan mendapatkan pendapatan dari ban konvensional dalam beberapa tahun ke depan. Ban tanpa udara memiliki struktur unik yang tidak memerlukan tekanan udara dan dirancang untuk meredam guncangan serta anti-bocor. Meskipun teknologi ini berpotensi mengurangi pendapatannya, Mariu sudah merasakan penurunan pendapatan saat beralih dari ban dalam ke ban tubeless, namun bisnisnya tetap bertahan.",
      //   url: "https://www.cnnindonesia.com/otomotif/20230105165715-579-896694/tukang-tambal-ban-respons-kehadiran-ban-tanpa-udara",
    },
    {
      id: 4,
      title: "4 TIPS MEMILIH BENGKEL TAMBAL BAN YANG AKURAT BESERTA METODENYA",
      description: "Memilih bengkel yang tepat untuk tambal ban perlu dilakukan dengan cermat karena tak jarang ada petugas tambal ban yang curang. ",
      image: require("../assets/slide2.png"),
      fullArticle: "Untuk memilih bengkel tambal ban yang tepat, perhatikan sekitar lokasinya, pastikan aman dan terhindar dari kejahatan. Amati juga jumlah pelanggan yang datang, keberadaan pelanggan dengan keluhan serupa bisa menjadi pertanda kecurangan. Pilih bengkel dengan lokasi yang strategis dan jam operasional yang sesuai. Pastikan petugasnya menjelaskan dengan jelas mengenai jenis tambalan dan proses perbaikan. Terdapat beberapa metode tambal ban yang umum digunakan. Metode patch cocok untuk ban dalam, dengan biaya mulai dari Rp20.000. Metode plug and patch, meskipun jarang dilakukan, memiliki biaya lebih tinggi sekitar Rp100.000. Sedangkan metode tire seal string cocok untuk ban tubeless, dengan biaya tambal mulai dari Rp20.000. Rawat kendaraan Anda secara teratur untuk menjaga keamanan di jalan.",
      //   url: "https://planetban.com/blog/4-tips-memilih-bengkel-tambal-ban-yang-akurat-beserta-metodenya",
    },
  ]);

  const handlePress = (item) => {
    navigation.navigate("ArticleDetail", { article: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <Box
        width="100%"
        borderRadius="10"
        backgroundColor="white"
        borderWidth="2"
        borderColor="#A7A7A7"
        mb="6"
        shadow="3"
        overflow="hidden"
      >
        <Image style={{ width: "100%", height: 380 }} source={item.image} />
        <Box p="5">
          <Text fontSize="lg" color="#5A1781" bold>{item.title}</Text>
          <Text fontSize="md" mt="2" color="gray.600">{truncateText(item.description, 80)}</Text>
          <Button
            onPress={() => handlePress(item)}
            mt="3"
            bgColor="#5A1781"
          >
            <Text color="white">Read More</Text>
          </Button>
        </Box>
      </Box>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title={"Artikel"} withBack={false} />
      <ScrollView flex={1} bg="#fff">
        <VStack space={4} alignItems="center" p={4}>
          <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      </ScrollView>
    </>
  );
};

export default Article;
