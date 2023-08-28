# lojiper-test-case

Lojiper Web Uygulama Test Case

## Genel Açıklama

Bu döküman, Lojiper için hazırlanan "Lojiper Web Uygulama Test Case" adlı teknik testin ayrıntılarını ve gereksinimlerini içermektedir.

## Proje Amaçları

Bu projenin amacı, NextJS, TypeScript ve Context API kullanarak otobüs bilet satış uygulaması geliştirmektir. Uygulama, kullanıcıların giriş yapması / kayıt olması ve ardından, otobüs seferlerini aratması ve seçtiği seferler için istediği koltukları seçerek bilet satın almasına olanak tanır.

## Teknik Detaylar

- Kullanılan Teknolojiler: NextJS, TypeScript, Context API
- Sefer Verileri: Statik JSON dosyalarını baz alarak NextJS API Routes ile kendi içindeki API endpointleri, Axios ile kullanarak elde edilir.
- Otobüs Düzeni: 2 sıra çift koltuk şeklinde, dolu koltuklar cinsiyet ikonları veya renklerle belirtilir.
- Koltuk Seçimi: En fazla 5 koltuk seçilebilir, kullanıcı girişi zorunlu olduğundan, giriş yapan kullanıcının cinsiyetine göre karşı cinsin yanına oturulamaz.
- Uygulamanın çeşitli yerlerinde toast mesajları ile kullanıcıya başarılı sonuçlar, hata mesajları ya da uyarılar görüntülenir

## Uygulama Sayfaları ve Özellikleri

### 1. Login Sayfası

- Kullanıcı adı ve şifre ile giriş yapılabilir.
- Başarılı giriş durumunda anasayfaya yönlendirilir.
- Hatalı giriş durumunda hata mesajı alır.
- İlk defa giriş yapan kullanıcılar kayıt ol sayfasına yönlendirilebilir.

https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/login.png

### 2. Kayıt Ol Sayfası

- Kullanıcı bilgileri (e-posta, şifre, ad, soyad, cinsiyet, doğum tarihi) girilebilir.
- Başarılı kayıt olma durumunda login sayfasına yönlendirilir.

https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/register.png

### 3. Anasayfa

- Kalkış yeri, varış yeri ve tarih bilgileri girilir.
- Girdiler zorunludur ve eğer eksik ise uyarı mesajı verilir.
- Ara butonu ile sorguya uygun seferler listelenir.
- Uygun sefer yoksa uyarı verilir.
- Seferlerin bilgileri (kalkış- varış şehirleri, tarih, boş koltuk sayısı, fiyat) görüntülenir.

https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/homepage.png

### 4. Bilet Satış Sayfası

- Sefer detayları ve fiyatı gösterilir.
- Koltuk seçimi yapılabilir.
- Koltuklar dolu ise dolu koltuklardaki kişilerin cinsiyetleri "E", "K" oalrak belirtilir.
- En fazla 5 koltuk seçilebilir, 6. koltuk seçimi uyarı verir.
- Yan yana iki koltuk birlikte alınmıyorsa, karşı cinsin yanına oturulamaz, bu durumda kullanıcıya uyarı mesajı verilir ve o koltuk seçilemez.
- Koltuk seçimleri yapıldıkça toplam tutar alanı güncellenir.
- Eğer kullanıcı koltuk seçmediyse, ödeme sayfasına geçemez bu durumda uyarı mesajı verilir.

https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/ticketpage.png
https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/ticketpage-warning.png

### 5. Ödeme Sayfası

- Toplam tutar gösterilir.
- Ödeme formu doldurulur ve onaylanır.
- Eğer form bilgileri eksik ise uyarı verilir.
- Ödeme başarılı ise spinner ile beklenir. (user-case için başarısız durum istenmediği için böyle bir senaryo hazırlanmamıştır.)
- Ödeme başarılı durumunda anasayfaya dönüş butonu ve mesaj görüntülenir.

https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/paymentpage.png
https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/payment-success.png

## Kurulum ve Çalıştırma

1.  **Repoyu Bilgisayarınıza Klonlayın:**

    - Projeyi klonlamak için öncelikle GitHub'da projenin olduğu sayfaya gidin.
    - Sağ üst köşede yeşil "Code" düğmesini bulun ve tıklayın.
    - Açılan menüden "Download ZIP" seçeneğini seçerek projeyi ZIP dosyası olarak indirin.
    - İndirilen ZIP dosyasını bir klasöre çıkarın.

2.  **Terminalde Proje Klasör Ana Dizinine Gidin:**

    - Bilgisayarınızda bir terminal veya komut istemcisini açın.
    - Klonladığınız projenin ana klasörüne gitmek için `cd` komutunu kullanın. Örneğin, `cd lojiper-test-case` şeklinde yazın. (eğer ana klasörün içindeyseniz, iki kere aynı komutu yaparak uygulama klasöründe olduğunuzdan emin olun)

3.  **Gerekli Bağımlılıkları Yüklemek İçin `npm install` Komutunu Çalıştırın:**

    - Terminalde projenin ana klasöründe olduğunuzdan emin olun.
    - Projenin gerekli bağımlılıklarını yüklemek için aşağıdaki komutu girin ve Enter tuşuna basın:

      `npm install`

    - Bu komut, projenin package.json dosyasındaki bağımlılıkları yükleyecektir. İnternet bağlantınızın aktif olması gerekmektedir.

4.  **Projeyi Başlatmak İçin `npm run dev` Komutunu Kullanın:**

    - Bağımlılıkları yükleme tamamlandıktan sonra, projeyi başlatmak için aşağıdaki komutu girin ve Enter tuşuna basın:

      `npm run dev`

    - Bu komut, projeyi geliştirme modunda çalıştıracaktır.

5.  **Tarayıcıda Uygulamayı Görüntülemek İçin `http://localhost:3000` Adresine Gidin:**

    - Proje başarıyla çalıştırıldığında, tarayıcınızı açın.
    - Adres çubuğuna `http://localhost:3000` yazın ve Enter tuşuna basın.
    - Bu adres, yerel sunucunuzda klonlanarak çalışan uygulamayı görüntüleyecektir.
