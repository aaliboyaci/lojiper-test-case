# lojiper-test-case

Lojiper Web Uygulama Test Case

## Genel Açıklama

Bu döküman, Lojiper için hazırlanan "Lojiper Web Uygulama Test Case" adlı teknik testin ayrıntılarını ve gereksinimlerini içermektedir.

## Proje Amaçları

Bu projenin amacı, NextJS, TypeScript ve Context API kullanarak otobüs bilet satış uygulaması geliştirmektir. Uygulama, kullanıcıların giriş yapması / kayıt olması ve ardından, otobüs seferlerini aratması ve seçtiği seferler için istediği koltukları seçerek bilet satın almasına olanak tanır.

## Canlı Demo

Uygulamanın canlı halini aşağıdaki linkten test edebilirsiniz. Bu dökümanın ilerleyen kısımlarında örnek sefer ve kullanıcı verileri verilmiştir. Test amaçlı o verileri takip edebilirsiniz

<a href="https://lojiper-test-case.vercel.app/" target="_blank">CANLI DEMO LINK</a>

`https://lojiper-test-case.vercel.app/`

Vercel üzerinden deploy edilmiştir.

## Teknik Detaylar

- Kullanılan Teknolojiler: React (18.2.0), NextJS (13.4.19), TypeScript, Context API, NextJS API Routes, ESLint (8.47.0), Axios (1.4.0)
- Uygulama üç katmanlı mimari yazılım felsefesini takip ederek yazılmıştır. Böylelikle "seperate of concerns" ilkesinin sağlanması amaçlanmıştır. Böylelikle, uygulamanın olası geliştirmeleri, bakımları ve unit testleri için kolaylık sağlayacak bir zemin hazırlanmıştır.
- Sefer Verileri: Statik JSON dosyalarını baz alarak NextJS API Routes ile kendi içindeki API endpointleri, Axios ile kullanarak elde edilir.
- Otobüs Düzeni: 2 sıra çift koltuk şeklinde, dolu koltuklar cinsiyet harfleri ve/veya renklerle belirtilir.
- Koltuk Seçimi: En fazla 5 koltuk seçilebilir, kullanıcı girişi zorunlu olduğundan, giriş yapan kullanıcının cinsiyetine göre karşı cinsin yanına oturulamaz.
- Uygulamanın çeşitli yerlerinde toast mesajları ile kullanıcıya başarılı sonuçlar, hata mesajları ya da uyarılar görüntülenir.

## Uygulama Sayfaları ve Özellikleri

### 1. Login Sayfası

- Kullanıcı adı ve şifre ile giriş yapılabilir.
- Başarılı giriş durumunda anasayfaya yönlendirilir.
- Hatalı giriş durumunda hata mesajı alır.
- İlk defa giriş yapan kullanıcılar kayıt ol sayfasına yönlendirilebilir.
- Giriş yaptıktan sonra, üst kısımda "Hoşgeldin" mesajının yanındaki "Çıkış yap" butonu ile LogOut işlemini gerçekleştirebilir.

<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/login.png" alt="login" width="600">

### 2. Kayıt Ol Sayfası

- Kullanıcı bilgileri (e-posta, şifre, ad, soyad, cinsiyet, doğum tarihi) girilebilir.
- Başarılı kayıt olma durumunda login sayfasına yönlendirilir.
  <img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/register.png  " alt="register" width="600">

### 3. Anasayfa

- Kalkış yeri, varış yeri ve tarih bilgileri girilir.
- Girdiler zorunludur ve eğer eksik ise uyarı mesajı verilir.
- Ara butonu ile sorguya uygun seferler listelenir.
- Uygun sefer yoksa uyarı verilir.
- Seferlerin bilgileri (kalkış- varış şehirleri, tarih, boş koltuk sayısı, fiyat) görüntülenir.

<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/homepage.png" alt="home" width="600">

### 4. Bilet Satış Sayfası

- Sefer detayları ve fiyatı gösterilir.
- Koltuk seçimi yapılabilir.
- Koltuklar dolu ise dolu koltuklardaki kişilerin cinsiyetleri "E", "K" oalrak belirtilir.
- En fazla 5 koltuk seçilebilir, 6. koltuk seçimi uyarı verir.
- Yan yana iki koltuk birlikte alınmıyorsa, karşı cinsin yanına oturulamaz, bu durumda kullanıcıya uyarı mesajı verilir ve o koltuk seçilemez.
- Koltuk seçimleri yapıldıkça toplam tutar alanı güncellenir.
- Eğer kullanıcı koltuk seçmediyse, ödeme sayfasına geçemez bu durumda uyarı mesajı verilir.

<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/ticketpage.png" alt="ticket" width="600">
<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/ticketpage-warning.png" alt="ticket-warning" width="600">

### 5. Ödeme Sayfası

- Toplam tutar gösterilir.
- Ödeme formu doldurulur ve onaylanır.
- Eğer form bilgileri eksik ise uyarı verilir.
- Ödeme başarılı ise spinner ile beklenir. (user-case için başarısız durum istenmediği için böyle bir senaryo hazırlanmamıştır.)
- Ödeme başarılı durumunda anasayfaya dönüş butonu ve mesaj görüntülenir.

<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/paymentpage.png" alt="payment" width="600">
<img src="https://github.com/aaliboyaci/lojiper-test-case/blob/ab62151a2516b349cb524c9fe3d0be2112d7a124/screen-shots/payment-success.png" alt="payment-succesful" width="600">

## Örnek Kullanıcı Verileri

Toplamda 3 adet ön tanımlı kullanıcı verisi oluşturuldu. Bu veriler ile kayıt olunmadan uygulamaya giriş yapılıp test edilebilir.

Kullanıcı adı: ahmety
Parola: 12345

Kullanıcı adı: elifk
Parola: 67890

Kullanıcı adı: cemoz
Parola: 43210

## Örnek Sefer Verileri

Toplamda 8 adet örnek sefer verisi oluşturuldu. Bu tarihler ve destinasyonlar dışındaki sorgularda kullanıcı “Uygun Sefer Bulunamadı” mesajıyla karşılanır.

31 Ağustos 2023
İstanbul > İzmir
İstanbul > Antalya
Ankara > İzmir
Ankara > Antalya

1 Eylül 2023
İstanbul > İzmir
İstanbul > Antalya
Ankara > İzmir
Ankara > Antalya

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
