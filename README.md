
# Udemy Clone Project


Bu proje, Inveon tarafından verilen bir proje kapsamında temel bir kurs satış sitesinin geliştirilmesi amacıyla hazırlanmıştır. Proje, modern web teknolojilerini ve katmanlı mimari prensiplerini kullanarak kullanıcı dostu ve güvenli bir uygulama geliştirmeyi hedeflemektedir.

Projenin Amacı
Bu projenin temel amacı, kullanıcıların kursları inceleyebileceği, satın alabileceği ve profillerini yönetebileceği bir platform oluşturmaktır. Bunun yanı sıra:

- Modern frontend ve backend teknolojilerini kullanarak kapsamlı bir web uygulaması geliştirmek
- JWT tabanlı kimlik doğrulama ile güvenliği sağlamak,
- Responsive bir tasarım ile tüm cihazlarda kullanıcı deneyimini optimize etmek.

# Teknolojiler
- React.js, Material UI
- Asp.Net Core API (N-Layer Architecture)
- MSSQL, EF Core
- JWT, Identity

# Proje Özellikleri
- Frontend (React)
1. Ana Sayfa
- Mevcut kursların kartlar şeklinde listelenmesi.
- Arama özelliği ile kurs ismine göre filtreleme.
- Kurs kartlarında şu bilgiler yer alır:
  *  Kurs adı
  * Açıklama
  * Fiyat
  * Detaylara Git butonu
2.  Kurs Detay Sayfası
  * Seçilen kursun detaylarını gösterir.
  * Kullanıcı giriş yapmışsa kursu satın alma özelliği.
  * Kullanıcı giriş yapmamışsa oturum açma uyarısı.

3. Kullanıcı Yönetimi
  * Kullanıcılar siteye kayıt olabilir ve giriş yapabilir.
  * Kullanıcı bilgileri güvenli bir şekilde saklanır.
  * Kullanıcının satın aldığı kurslar profil sayfasında görüntülenebilir.
4. Satın Alma ve Ödeme
  * Kullanıcı kursları satın alabilir.
  * Başarılı satın alma işlemleri sonrası sipariş geçmişine erişebilir.
 ------------------------------------------------------------ 
- Backend (ASP.NET Core API)
1.  JWT Kimlik Doğrulama

* Kullanıcıların güvenli bir şekilde giriş yapmasını sağlar.
* Her kullanıcının yalnızca kendi verilerine erişmesini sağlar.
2. API Katmanları
* Kullanıcı Yönetimi: Kayıt, giriş, profil güncelleme.
* Kurs Yönetimi: Kurs listeleme, arama, detay görüntüleme.
* Satın Alma: Kurs satın alma ve sipariş geçmişi.
3. N-Layer Architecture
* İş mantığı, veri erişimi ve sunum katmanlarının ayrıştırıldığı bir yapı.

Proje Akışı
Kullanıcı Akışı
Kullanıcı, ana sayfada kursları görüntüler.
İlgilendiği bir kursun detaylarını inceleyebilir.
Üye olarak veya giriş yaparak kursu satın alabilir.
Satın aldığı kursları profil sayfasında görüntüleyebilir.
Admin Akışı (Opsiyonel)
Kurs yönetimi ve kullanıcı işlemleri için bir admin paneli eklenebilir.
Yeni kurs ekleme, güncelleme veya silme işlemleri yapılabilir.
## Proje Nasıl Çalıştırılır?

1. Depoyu klonlayın:
  git clone https://github.com/BurakOzdemir12/UdemyProject.git

2. Bağımlılıkları yükleyin:
 - cd client-react
 - npm install
 - cd ../API
 - dotnet restore

3. React ve ASP.NET Core projelerini çalıştırın:
- cd client-react
- npm start
- cd ../API
- dotnet run

## Ekran Görüntüleri

![Giriş Sayfası](./public/images/frgithub/Login.png)
![Kaydolma Sayfası](./public/images/frgithub/Register.png)
![Ana Sayfa](./public/images/frgithub/home.png)
![Kurs Detayları](./public/images/frgithub/coursedetails.png)
![Sepet](./public/images/frgithub/Cart.png)
![Ödeme Form](./public/images/frgithub/PaymentForm.png)
![Profil](./public/images/frgithub/Profile.png)
![Modal](./public/images/frgithub/updateprofile.png)
![Ödemeler](./public/images/frgithub/payments.png)

  
