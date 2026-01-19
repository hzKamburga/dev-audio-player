# Dev Audio Player

Geliştirici portfolyoları ve GitHub Pages için tasarlanmış, hafif ve bağımlılık gerektirmeyen bir ses oynatıcı kütüphanesi.

![Lisans](https://img.shields.io/badge/license-AGPL%20v3.0-blue.svg)
![Boyut](https://img.shields.io/badge/size-~5kb-green.svg)
![Yapay Zeka ile Üretildi](https://img.shields.io/badge/AI-Generated-orange.svg)

> **Not**: Bu proje Yapay Zeka desteği ile geliştirilmiştir.

## Özellikler

- **Sıfır Bağımlılık**: Saf Vanilla JS, framework gerektirmez.
- **CDN Hazır**: jsDelivr üzerinden anında çalışır.
- **Temalar**: Dahili Koyu (Dark) ve Açık (Light) temalar.
- **Görselleştirici**: Web Audio API kullanan opsiyonel mini ses görselleştirici.
- **Akıllı Durum**: Sayfa yenilendiğinde oynatma/duraklatma durumunu hatırlar.
- **Erişilebilir**: Klavye kısayolları (Boşluk tuşu ile oynat/duraklat) ve ARIA etiketleri.
- **Duyarlı**: Konteyner genişliğine uyum sağlar.

## GitHub Profilinde Kullanım

**Önemli:** GitHub `README.md` dosyaları güvenlik nedeniyle doğrudan JavaScript çalıştırmayı veya etkileşimli öğeleri **desteklemez**. Yani oynatıcıyı doğrudan profil sayfanıza gömemezsiniz.

Bunun yerine, kullanıcıları şarkınızın çaldığı özel bir sayfaya yönlendiren bir **"Müzik Çal" rozeti (badge)** kullanabilirsiniz.

### Önerilen Yöntem: "Müzik Çal" Rozeti

Profil `README.md` dosyanıza şu kodu ekleyin:

```markdown
[![Müzik Çal](https://img.shields.io/badge/Müzik_Çal-Portfolyo_Müziğim-blue?style=for-the-badge&logo=applemusic)](https://hzkamburga.github.io/dev-audio-player/demo/play.html?src=SES_DOSYASI_URL&theme=dark)
```

`SES_DOSYASI_URL` kısmını kendi MP3 dosyanızın doğrudan bağlantısı ile değiştirin.

**Nasıl Çalışır?**
1. Ziyaretçi profilinizdeki "Müzik Çal" butonuna tıklar.
2. Yeni bir sekmede minimal bir oynatıcı sayfası açılır.
3. Müzik otomatik olarak çalmaya başlar (tarayıcı izin verirse) veya kullanıcı oynat butonuna basar.

## Web Siteleri İçin Hızlı Başlangıç

Kendi web sitenizde (örneğin portfolyonuzda) kullanmak için:

HTML dosyanıza script'i ekleyin:

```html
<script src="https://cdn.jsdelivr.net/gh/hzKamburga/dev-audio-player@main/dist/dev-audio-player.min.js"></script>
```

Onyatıcıyı başlatın:

```html
<div id="my-player"></div>

<script>
  createPlayer({
    container: '#my-player',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    theme: 'dark'
  });
</script>
```

## API Referansı

### `createPlayer(options)`

| Seçenek | Tip | Varsayılan | Açıklama |
|---------|-----|------------|----------|
| `src` | `string` | **Zorunlu** | Ses dosyası URL'si (MP3, WAV, OGG). YouTube URL'leri desteklenmez. |
| `container` | `string` | `'body'` | Konteyner elementi için CSS seçicisi. |
| `theme` | `'dark' \| 'light'` | `'dark'` | Oynatıcı renk teması. |
| `autoplay` | `boolean` | `false` | Otomatik oynatma (tarayıcı politikasına tabidir). |
| `loop` | `boolean` | `false` | Bittiğinde başa sar. |
| `volume` | `number` | `1.0` | Başlangıç ses seviyesi (0.0 - 1.0). |

## Chrome Otomatik Oynatma Politikası

Modern tarayıcılar (Chrome, Safari, Firefox), kullanıcı sayfayla etkileşime girene kadar (tıklama, dokunma, tuşa basma) sesin otomatik başlamasını engeller.

- Bu kütüphane bu politikaya saygı duyar.
- Görselleştirici (Visualizer) sadece ilk kullanıcı etkileşiminden sonra başlar.
- `autoplay: true` ayarlanırsa, oynatıcı çalmayı dener. Engellenirse konsola bilgi verir ve kullanıcı etkileşimi bekler.

## Geliştirme

1. Depoyu klonlayın
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Projeyi derleyin:
   ```bash
   npm run build
   ```
4. Sonucu görmek için `demo/index.html` dosyasını açın.

## Lisans

GNU Affero General Public License v3.0 (AGPL-3.0)
