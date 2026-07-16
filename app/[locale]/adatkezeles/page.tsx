import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("privacyTitle"), description: t("privacyDescription") };
}

export default async function AdatkezelesPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      {/* Hero */}
      <section className={`section bg-grid ${styles.hero}`}>
        <div className="container">
          <SectionReveal>
            <span className="badge">
              {locale === "hu" ? "Jogi Dokumentumok" : "Legal Documents"}
            </span>
            <h1 className={`display-2 ${styles.heroTitle}`}>
              {locale === "hu" ? "Adatkezelési Tájékoztató" : "Privacy Policy"}
            </h1>
            <p className="body-lg" style={{ maxWidth: 640 }}>
              {locale === "hu" 
                ? "Hatályos: 2026. 07. 16. napjától | Elérhető: sironic.eu/adatkezeles"
                : "Effective: July 16, 2026 | Available at: sironic.eu/privacy"}
            </p>
          </SectionReveal>
        </div>
        <div className={styles.heroGlow} aria-hidden />
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <SectionReveal>
            <div className={styles.contentWrapper}>
              {locale === "en" && (
                <div className={styles.disclaimerCard}>
                  <p className="body-md">
                    <strong>Please note:</strong> The official, legally binding Privacy Policy (Adatkezelési Tájékoztató) of SIROTECH Kft. is written and maintained only in Hungarian. The Hungarian text is presented below for legal and reference purposes.
                  </p>
                  <p className="body-sm" style={{ marginTop: "0.5rem", opacity: 0.8 }}>
                    <strong>Kérjük vegye figyelembe:</strong> A SIROTECH Kft. hivatalos és jogilag kötelező érvényű Adatkezelési Tájékoztatója kizárólag magyar nyelven érhető el. Az alábbiakban a hivatalos magyar nyelvű szöveget olvashatja.
                  </p>
                </div>
              )}

              <div className="card">
                <span className="accent-line" />
                
                <div className={styles.legalBody}>
                  <section className={styles.section}>
                    <h2 className="heading-2">1. Bevezetés, az Adatkezelő adatai</h2>
                    <p>
                      Jelen Adatkezelési Tájékoztató (a továbbiakban: Tájékoztató) célja, hogy a sironic.eu weboldal (és aldomainjei, a továbbiakban: Weboldal) látogatói, valamint a Weboldalon keresztül kapcsolatba lépő érdeklődők és ügyfelek (a továbbiakban: Érintett) számára átlátható, közérthető tájékoztatást nyújtson a személyes adataik kezeléséről, az Európai Parlament és a Tanács (EU) 2016/679 rendelete (a továbbiakban: GDPR), valamint az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (a továbbiakban: Infotv.) rendelkezéseivel összhangban.
                    </p>

                    <h3 className="heading-3">Adatkezelő megnevezése és elérhetőségei:</h3>
                    <div className={styles.tableWrapper}>
                      <table className={styles.infoTable}>
                        <tbody>
                          <tr>
                            <th>Cégnév</th>
                            <td>SIROTECH Kft.</td>
                          </tr>
                          <tr>
                            <th>Székhely</th>
                            <td>8000 Székesfehérvár, Lövölde utca 24 4/15</td>
                          </tr>
                          <tr>
                            <th>Adószám</th>
                            <td>33056151-2-07</td>
                          </tr>
                          <tr>
                            <th>Cégjegyzékszám</th>
                            <td>07-09-037603</td>
                          </tr>
                          <tr>
                            <th>Képviselő</th>
                            <td>Skoda Dávid András</td>
                          </tr>
                          <tr>
                            <th>E-mail cím</th>
                            <td><a href="mailto:hello@sironic.hu">hello@sironic.hu</a></td>
                          </tr>
                          <tr>
                            <th>Telefonszám</th>
                            <td>+36 70 273 5532</td>
                          </tr>
                          <tr>
                            <th>Weboldal</th>
                            <td>sironic.eu</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className={styles.subtext}>(a továbbiakban: Adatkezelő)</p>
                    <p>
                      Az Adatkezelő fenntartja a jogot jelen Tájékoztató egyoldalú módosítására, amelyről a Weboldalon történő közzététel útján tájékoztatja az Érintetteket. A módosítás nem érinti a már megadott adatok kezelésének jogszerűségét.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">2. Fogalommeghatározások</h2>
                    <p>A Tájékoztatóban használt fogalmak a GDPR 4. cikkében meghatározottakkal egyeznek meg, ezek közül a legfontosabbak:</p>
                    <ul className={styles.bulletList}>
                      <li><strong>Személyes adat:</strong> azonosított vagy azonosítható természetes személyre („Érintett”) vonatkozó bármely információ.</li>
                      <li><strong>Adatkezelés:</strong> a személyes adatokon végzett bármely művelet (gyűjtés, rögzítés, tárolás, továbbítás, törlés stb.).</li>
                      <li><strong>Adatkezelő:</strong> aki az adatkezelés céljait és eszközeit meghatározza.</li>
                      <li><strong>Adatfeldolgozó:</strong> aki az Adatkezelő nevében, annak megbízásából kezel személyes adatokat (pl. tárhelyszolgáltató).</li>
                      <li><strong>Hozzájárulás:</strong> az Érintett önkéntes, konkrét, tájékozott és egyértelmű akaratnyilatkozata.</li>
                    </ul>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">3. Az adatkezelés alapelvei</h2>
                    <p>
                      Az Adatkezelő a személyes adatokat jogszerűen, tisztességesen és átlátható módon, célhoz kötötten, az adattakarékosság elvét szem előtt tartva, pontosan, korlátozott ideig, valamint megfelelő biztonsági intézkedések mellett kezeli, a GDPR 5. cikkében foglalt alapelveknek megfelelően.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">4. Az adatkezelés egyes esetei</h2>
                    
                    <h3 className="heading-3">4.1. Kapcsolatfelvételi / ajánlatkérő űrlap használata</h3>
                    <p>A Weboldalon elérhető kapcsolatfelvételi/ajánlatkérő űrlap segítségével az Érintett tájékoztató jellegű ajánlatot kérhet, amelynek keretében az alábbi adatokat adja meg:</p>
                    <ol className={styles.numberedList} style={{ marginBottom: "1.5rem" }}>
                      <li>A projektre/cégre vonatkozó adatok: munkaállomások, szerverek, telephelyek száma; jelenlegi informatikai környezet; igényelt szolgáltatás típusa.</li>
                      <li>Személyes adatok: név, cégnév, telefonszám, e-mail cím, székhely/telephely.</li>
                    </ol>

                    <div className={styles.tableWrapper}>
                      <table className={styles.contentTable}>
                        <thead>
                          <tr>
                            <th>Szempont</th>
                            <th>Tartalom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Az adatkezelés célja</strong></td>
                            <td>Egyedi ajánlat összeállítása és megküldése, az Érintettel történő kapcsolatfelvétel, a szolgáltatás igénybevételének előkészítése.</td>
                          </tr>
                          <tr>
                            <td><strong>Az adatkezelés jogalapja</strong></td>
                            <td>GDPR 6. cikk (1) bek. b) pontja — szerződés megkötését megelőzően az Érintett kérésére történő lépések megtétele. Amennyiben ez nem állapítható meg egyértelműen, a jogalap a GDPR 6. cikk (1) bek. a) pontja szerinti önkéntes hozzájárulás.</td>
                          </tr>
                          <tr>
                            <td><strong>Adattovábbítás módja</strong></td>
                            <td>Az űrlapban megadott adatokat a rendszer automatikusan, e-mail útján továbbítja az Adatkezelő részére.</td>
                          </tr>
                          <tr>
                            <td><strong>Adatkezelés időtartama</strong></td>
                            <td>Szerződéskötés hiányában az ajánlatkérés beérkezésétől számított legfeljebb 90 napig, ezt követően törlésre kerül (kivéve hozzájárulás esetén). Szerződéskötés esetén a jogviszony és az elévülési/számviteli kötelezettségek végéig.</td>
                          </tr>
                          <tr>
                            <td><strong>Címzettek</strong></td>
                            <td>Az Adatkezelő feljogosított munkatársai, valamint a Weboldal technikai üzemeltetését végző Adatfeldolgozó (tárhelyszolgáltató).</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="heading-3" style={{ marginTop: "2.5rem" }}>4.2. Kapcsolatfelvétel (telefon, e-mail)</h3>
                    <div className={styles.tableWrapper}>
                      <table className={styles.contentTable}>
                        <thead>
                          <tr>
                            <th>Szempont</th>
                            <th>Tartalom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Az adatkezelés célja</strong></td>
                            <td>A megkeresés megválaszolása, kapcsolattartás.</td>
                          </tr>
                          <tr>
                            <td><strong>Az adatkezelés jogalapja</strong></td>
                            <td>GDPR 6. cikk (1) bek. a) pontja — az Érintett önkéntes hozzájárulása.</td>
                          </tr>
                          <tr>
                            <td><strong>Adatkezelés időtartama</strong></td>
                            <td>A megkeresés megválaszolásáig, illetve az azt követő 30 napig, amennyiben nem jön létre további üzleti kapcsolat.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="heading-3" style={{ marginTop: "2.5rem" }}>4.3. Szerződéskötés, számlázás, folyamatos (előfizetéses) szolgáltatás</h3>
                    <div className={styles.tableWrapper}>
                      <table className={styles.contentTable}>
                        <thead>
                          <tr>
                            <th>Szempont</th>
                            <th>Tartalom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Az adatkezelés célja</strong></td>
                            <td>Szerződés teljesítése, számlázás, valamint a rendszergazdai/üzemeltetési szolgáltatás nyújtásához (pl. távoli hozzáférés) szükséges adatkezelés.</td>
                          </tr>
                          <tr>
                            <td><strong>Az adatkezelés jogalapja</strong></td>
                            <td>GDPR 6. cikk (1) bek. b) pontja (szerződés teljesítése), valamint c) pontja (jogi kötelezettség teljesítése).</td>
                          </tr>
                          <tr>
                            <td><strong>Adatkezelés időtartama</strong></td>
                            <td>Számviteli bizonylatok (számlák) esetében a számvitelről szóló 2000. évi C. törvény 169. § (2) bekezdése alapján 8 év. Egyéb dokumentumok a szerződésből eredő igények elévüléséig (általános esetben 5 év). A rendszerfelügyelet során keletkező hozzáférési naplók (log) legfeljebb 1 évig.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="heading-3" style={{ marginTop: "2.5rem" }}>4.4. Sütik (cookie-k) kezelése</h3>
                    <h4 className={styles.subHeading} style={{ marginTop: "1rem", color: "var(--silver)" }}>a) Feltétlenül szükséges (technikai) sütik</h4>
                    <p>
                      Ezek a sütik a Weboldal alapvető működéséhez (pl. munkamenet fenntartása) elengedhetetlenül szükségesek, elhelyezésükhez nem szükséges az Érintett előzetes hozzájárulása. Jogalapjuk az Adatkezelő jogos érdeke (GDPR 6. cikk (1) bek. f) pont).
                    </p>
                    <h4 className={styles.subHeading} style={{ color: "var(--silver)" }}>b) Statisztikai / elemző sütik (pl. Google Analytics)</h4>
                    <p>
                      A Weboldal a látogatottság elemzése céljából anonimizált adatgyűjtő eszközt alkalmazhat. Ezen sütik elhelyezése kizárólag az Érintett előzetes, önkéntes hozzájárulása esetén történik.
                    </p>

                    <div className={styles.tableWrapper}>
                      <table className={styles.contentTable}>
                        <thead>
                          <tr>
                            <th>Süti típusa</th>
                            <th>Cél</th>
                            <th>Jogalap</th>
                            <th>Időtartam</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Munkamenet / technikai</strong></td>
                            <td>A Weboldal működésének biztosítása</td>
                            <td>Jogos érdek / jogszabály</td>
                            <td>Böngésző bezárásáig / max. 1 év</td>
                          </tr>
                          <tr>
                            <td><strong>Google Analytics</strong></td>
                            <td>Látogatottsági statisztika</td>
                            <td>Hozzájárulás</td>
                            <td>Google szabályzata szerint (max. 14-26 hónap)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">5. Adatfeldolgozók és egyéb adattovábbítás</h2>
                    <p>Az Adatkezelő a következő Adatfeldolgozókat veszi igénybe:</p>
                    
                    <div className={styles.tableWrapper}>
                      <table className={styles.contentTable}>
                        <thead>
                          <tr>
                            <th>Tevékenység</th>
                            <th>Név</th>
                            <th>Székhely</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>Tárhelyszolgáltatás, weboldal üzemeltetés</strong></td>
                            <td>SIROTECH Kft.</td>
                            <td>8000 Székesfehérvár, Lövölde utca 24 4/15</td>
                          </tr>
                          <tr>
                            <td><strong>Statisztikai szolgáltatás</strong></td>
                            <td>Google Ireland Limited</td>
                            <td>Gordon House, Barrow Street, Dublin 4, Írország</td>
                          </tr>
                          <tr>
                            <td><strong>Könyvelés, számlázás</strong></td>
                            <td>Kinevezett könyvelő / számlázó</td>
                            <td>-</td>
                          </tr>
                          <tr>
                            <td><strong>Felhő infrastruktúra (ügyfél igény esetén)</strong></td>
                            <td>Microsoft Ireland Operations Ltd. / egyéb felhőszolgáltató</td>
                            <td>EGT / megfelelő garanciák mellett harmadik ország</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p style={{ marginTop: "1.5rem" }}>
                      Az Adatkezelő az adatok továbbítását harmadik fél részére kizárólag jogszabály vagy hozzájárulás alapján végzi. EGT-n kívüli adattovábbítás a Google Analytics, illetve a Megrendelő által igénybe vett felhőszolgáltatások esetében fordulhat elő, minden esetben az adott szolgáltató adatvédelmi elvei és a GDPR által megkövetelt garanciák (pl. általános szerződési feltételek/SCC) alapján.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">6. Az Érintettek jogai</h2>
                    <p>Az Érintett a GDPR alapján az alábbi jogokkal élhet, amelyeket az Adatkezelő elérhetőségein (hello@sironic.hu) gyakorolhat:</p>
                    <ul className={styles.bulletList}>
                      <li><strong>Tájékoztatáshoz és hozzáféréshez való jog:</strong> tájékoztatást kérhet az adatkezelés tényéről és részleteiről.</li>
                      <li><strong>Helyesbítéshez való jog:</strong> kérheti a pontatlan adatok javítását.</li>
                      <li><strong>Törléshez való jog:</strong> kérheti adatai törlését, ha az adatkezelés célja megszűnt vagy visszavonta hozzájárulását.</li>
                      <li><strong>Az adatkezelés korlátozásához való jog.</strong></li>
                      <li><strong>Adathordozhatósághoz való jog:</strong> kérheti adatai géppel olvasható formátumban történő kiadását.</li>
                      <li><strong>Tiltakozáshoz való jog:</strong> jogos érdeken alapuló adatkezelés esetén.</li>
                      <li><strong>Hozzájárulás visszavonásának joga:</strong> bármikor visszavonhatja a hozzájárulást.</li>
                    </ul>
                    <p>
                      Az Adatkezelő a kérelmeket indokolatlan késedelem nélkül, de legkésőbb a beérkezéstől számított egy hónapon belül teljesíti.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">7. Jogorvoslati lehetőségek</h2>
                    
                    <h3 className="heading-3">a) Panasz a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH)</h3>
                    <div className={styles.tableWrapper}>
                      <table className={styles.infoTable}>
                        <tbody>
                          <tr>
                            <th>Székhely</th>
                            <td>1055 Budapest, Falk Miksa utca 9-11.</td>
                          </tr>
                          <tr>
                            <th>Postacím</th>
                            <td>1363 Budapest, Pf. 9.</td>
                          </tr>
                          <tr>
                            <th>Telefon</th>
                            <td>+36 (1) 391-1400</td>
                          </tr>
                          <tr>
                            <th>E-mail</th>
                            <td><a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a></td>
                          </tr>
                          <tr>
                            <th>Weboldal</th>
                            <td><a href="https://www.naih.hu" target="_blank" rel="noopener noreferrer">www.naih.hu</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="heading-3" style={{ marginTop: "2.5rem" }}>b) Bírósági jogorvoslat</h3>
                    <p>
                      Az Érintett jogosult a jogainak megsértése esetén bírósághoz fordulni. A per a törvényszék hatáskörébe tartozik, az Érintett választása szerint a lakóhelye szerinti törvényszék előtt is megindítható.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">8. Adatbiztonsági intézkedések</h2>
                    <p>
                      Az Adatkezelő – tekintettel arra, hogy tevékenysége körében informatikai biztonsági szolgáltatásokat is nyújt – megfelelő technikai és szervezési intézkedésekkel gondoskodik a kezelt személyes adatok biztonságáról, és védi azokat a jogosulatlan hozzáférés, megváltoztatás, továbbítás, nyilvánosságra hozatal, törlés, megsemmisítés, valamint a véletlen megsemmisülés és sérülés ellen. Ennek körében többek között az alábbi intézkedéseket alkalmazza:
                    </p>
                    <ul className={styles.bulletList}>
                      <li>titkosított adatátvitel (HTTPS/TLS) a Weboldalon és a levelezés során;</li>
                      <li>hozzáférés-kezelés és jogosultsági szintek alkalmazása a rendszergazdai/üzemeltetési feladatok ellátása során;</li>
                      <li>rendszeres biztonsági mentés;</li>
                      <li>vírus- és kártevővédelem;</li>
                      <li>naplózás és rendszeres biztonsági felülvizsgálat.</li>
                    </ul>
                    <p>
                      Az Adatkezelő rendszereit és a Weboldalt üzemeltető tárhelyszolgáltató infrastruktúráját megfelelő fizikai, logikai és adminisztratív védelmi intézkedésekkel látja el.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">9. Záró rendelkezések</h2>
                    <p>
                      Jelen Tájékoztatóra a magyar jog, elsősorban a GDPR és az Infotv. rendelkezései az irányadóak. Az Adatkezelő fenntartja a jogot, hogy jelen Tájékoztatót egyoldalúan, a Weboldalon történő közzététellel módosítsa.
                    </p>
                    <p style={{ marginTop: "2rem", fontWeight: "bold" }}>Utolsó módosítás dátuma: 2026. 07. 16.</p>
                  </section>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
