import { getTranslations } from "next-intl/server";
import SectionReveal from "@/components/ui/SectionReveal";
import type { Metadata } from "next";
import styles from "./page.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aszfTitle"), description: t("aszfDescription") };
}

export default async function AszfPage({ params }: Props) {
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
              {locale === "hu" ? "Általános Szerződési Feltételek" : "General Terms & Conditions"}
            </h1>
            <p className="body-lg" style={{ maxWidth: 640 }}>
              {locale === "hu" 
                ? "Hatályos: 2026. 07. 16. napjától | Elérhető: sironic.eu/aszf"
                : "Effective: July 16, 2026 | Available at: sironic.eu/terms"}
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
                    <strong>Please note:</strong> The official, legally binding General Terms and Conditions (ÁSZF) of SIROTECH Kft. are written and maintained only in Hungarian. The Hungarian text is presented below for legal and reference purposes.
                  </p>
                  <p className="body-sm" style={{ marginTop: "0.5rem", opacity: 0.8 }}>
                    <strong>Kérjük vegye figyelembe:</strong> A SIROTECH Kft. hivatalos és jogilag kötelező érvényű Általános Szerződési Feltételei kizárólag magyar nyelven érhetőek el. Az alábbiakban a hivatalos magyar nyelvű szöveget olvashatja.
                  </p>
                </div>
              )}

              <div className="card">
                <span className="accent-line" />
                
                <div className={styles.legalBody}>
                  <section className={styles.section}>
                    <h2 className="heading-2">1. Bevezető rendelkezések</h2>
                    <p>
                      Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) szabályozzák a sironic.eu weboldalon (a továbbiakban: Weboldal) keresztül kezdeményezett kapcsolatfelvétel, ajánlatkérés, valamint az ezt követően esetlegesen létrejövő informatikai szolgáltatási (rendszergazdai, IT outsourcing, üzemeltetési, karbantartási stb.) szerződések általános feltételeit.
                    </p>
                    <p>
                      <strong>Fontos:</strong> a Weboldal nem minősül webáruháznak (webshopnak), azon keresztül közvetlen, online fizetést igénylő termék- vagy szolgáltatásvásárlásra nincs lehetőség. A Weboldal elsődleges célja a látogatók tájékoztatása, valamint a kapcsolatfelvétel és az ajánlatkérés lebonyolításának megkönnyítése.
                    </p>

                    <h3 className="heading-3">1.1. Szolgáltató (a Vállalkozás) adatai</h3>
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
                          <tr>
                            <th>Tárhelyszolgáltató</th>
                            <td>SIROTECH Kft. — 8000 Székesfehérvár, Lövölde utca 24 4/15</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className={styles.subtext}>(a továbbiakban: Szolgáltató)</p>

                    <h3 className="heading-3">1.2. A Megrendelő</h3>
                    <p>
                      Jelen ÁSZF alkalmazásában Megrendelőnek minősül minden természetes vagy jogi személy, aki a Weboldalon keresztül a Szolgáltatóval kapcsolatba lép, tőle ajánlatot kér, vagy vele szerződéses jogviszonyt létesít (a továbbiakban: Megrendelő).
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">2. A szolgáltatások köre</h2>
                    <p>A Szolgáltató tevékenységi köre elsődlegesen az alábbi informatikai szolgáltatásokra terjed ki:</p>
                    <ul className={styles.bulletList}>
                      <li>rendszergazdai szolgáltatás, folyamatos vagy eseti IT support / helpdesk, IT outsourcing;</li>
                      <li>hálózat tervezése, kiépítése és karbantartása;</li>
                      <li>szerverek telepítése, üzemeltetése és karbantartása;</li>
                      <li>felhő alapú szolgáltatások (pl. Microsoft 365) bevezetése és felügyelete;</li>
                      <li>adatmentési (backup) megoldások kialakítása és üzemeltetése;</li>
                      <li>informatikai biztonsági szolgáltatások (vírusvédelem, tűzfal, VPN, ransomware védelem, IT biztonsági audit);</li>
                      <li>informatikai tanácsadás, rendszertervezés, IT audit;</li>
                      <li>a fentiekhez kapcsolódó egyéb, egyedileg meghatározott informatikai szolgáltatás.</li>
                    </ul>
                    <p>
                      A Weboldalon feltüntetett szolgáltatások és az azokhoz kapcsolódó tájékoztató tartalmak (leírások, illusztrációk, árazási irányárak) kizárólag tájékoztató jellegűek, és nem minősülnek a Szolgáltató részéről tett kötelező erejű ajánlatnak.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">3. A megrendelés menete</h2>
                    <p>A Szolgáltató és a Megrendelő közötti szerződéses jogviszony létrejötte az alábbi, egymást követő lépéseken keresztül valósul meg:</p>
                    
                    <h3 className="heading-3">3.1. Lépés – Ajánlatkérés a Weboldalon</h3>
                    <p>
                      A Megrendelő a Weboldalon található kapcsolatfelvételi űrlapon, e-mailben vagy telefonon megadja az igényelt szolgáltatásra vonatkozó alapadatokat (pl. cégméret, munkaállomások/szerverek száma, jelenlegi informatikai környezet), valamint elérhetőségi adatait (név, telefonszám, e-mail cím, székhely/telephely).
                    </p>
                    <p>
                      Az így megadott adatok a Szolgáltató részére e-mailben, illetve az űrlap útján kerülnek továbbításra, ajánlatadás céljából. Az adatkezelés részleteiről a Weboldalon közzétett Adatkezelési Tájékoztató nyújt bővebb információt.
                    </p>

                    <h3 className="heading-3">3.2. Lépés – Kapcsolatfelvétel és egyeztetés</h3>
                    <p>
                      Az ajánlatkérés beérkezését követően a Szolgáltató munkatársa a megadott elérhetőségeken felveszi a kapcsolatot a Megrendelővel az igények pontosítása, valamint az igényfelmérés (helyszíni vagy távoli) időpontjának egyeztetése céljából.
                    </p>

                    <h3 className="heading-3">3.3. Lépés – Igényfelmérés</h3>
                    <p>
                      A végleges, kötelező erejű ajánlat kiadásának előfeltétele az igényfelmérés elvégzése, amelynek keretében a Szolgáltató szakembere – helyszíni bejárás vagy távoli (remote) felmérés útján – ellenőrzi és pontosítja a Megrendelő informatikai környezetét, a tervezett szolgáltatás műszaki paramétereit, valamint az esetleges kiegészítő igényeket (pl. hálózati infrastruktúra, szerverkapacitás, licencelési helyzet, biztonsági kockázatok).
                    </p>
                    <p>
                      Az igényfelmérés díjmentes, kivéve, ha a Szolgáltató és a Megrendelő ettől eltérően állapodnak meg (pl. összetett, több telephelyet érintő felmérés esetén).
                    </p>

                    <h3 className="heading-3">3.4. Lépés – Végleges ajánlat és szerződéskötés</h3>
                    <p>
                      Az igényfelmérés eredménye alapján a Szolgáltató írásbeli, végleges és kötelező erejű ajánlatot készít, amely tartalmazza a nyújtandó szolgáltatások részletezését, a szolgáltatási szinteket (SLA), a teljesítési határidőt, valamint a fizetési feltételeket. A végleges ajánlat elfogadásával, illetve az erről szóló egyedi szerződés (pl. keretszerződés, karbantartási szerződés, vállalkozási szerződés) aláírásával jön létre a felek közötti szerződéses jogviszony.
                    </p>

                    <h3 className="heading-3">3.5. Lépés – Megvalósítás, üzembe helyezés és folyamatos szolgáltatás</h3>
                    <p>
                      A szerződés létrejöttét követően a Szolgáltató a felek által egyeztetett ütemezés szerint elvégzi a bevezetési/kivitelezési munkálatokat, amelyről – jellegétől függően – átadás-átvételi jegyzőkönyv készülhet. Folyamatos (előfizetéses) szolgáltatás esetén a Szolgáltató a szerződésben rögzített szolgáltatási szint (SLA) szerint látja el a rendszergazdai/üzemeltetési feladatokat.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">4. Az online tájékoztatás jogi jellege</h2>
                    <ol className={styles.numberedList}>
                      <li>A Weboldalon feltüntetett árak, árazási sávok és becslések kizárólag tájékoztató jellegű, előzetes becslések, amelyek nem minősülnek a Szolgáltató részéről a Polgári Törvénykönyv szerinti kötelező erejű szerződéses ajánlatnak.</li>
                      <li>A tájékoztató jellegű becslés a Megrendelő által önkéntesen megadott, ellenőrizetlen adatokon alapul, ezért attól a végleges ajánlat – az igényfelmérés során feltárt tényleges műszaki körülmények, akadályok vagy egyéb, előzetesen nem ismert tényezők miatt – jelentősen eltérhet.</li>
                      <li>A Szolgáltatót a Weboldalon feltüntetett becsült ár tekintetében semmilyen kötelezettség nem terheli, és a becsült ár Megrendelő általi megismerése önmagában semmilyen szerződéses igényt nem keletkeztet a Szolgáltatóval szemben.</li>
                      <li>A felek közötti szerződéses jogviszony kizárólag a jelen ÁSZF 3.4. pontja szerinti végleges ajánlat elfogadásával, illetve az egyedi szerződés aláírásával jön létre.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">5. Díjazás és fizetési feltételek</h2>
                    <p>
                      A szolgáltatások díja az egyedi szerződésben/ajánlatban meghatározott mértékű, amely lehet egyszeri (projekt jellegű) díj, rendszeres (havi/negyedéves) átalánydíj, vagy tényleges óradíj alapú elszámolás.
                    </p>
                    <p>
                      A Szolgáltató a teljesítésről számlát állít ki, amelyet a Megrendelő a számlán feltüntetett fizetési határidőn belül, banki átutalással köteles kiegyenlíteni. Késedelmes fizetés esetén a Szolgáltató jogosult a Ptk. szerinti késedelmi kamat felszámítására, valamint indokolt esetben a szolgáltatás nyújtásának felfüggesztésére. A díjak az általános forgalmi adót nem tartalmazzák, kivéve, ha az ajánlat/szerződés kifejezetten másként rendelkezik.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">6. Elállás, módosítás, lemondás</h2>
                    <ol className={styles.numberedList}>
                      <li>A Megrendelő az ajánlatkérést, illetve az igényfelmérésre vonatkozó időpont-egyeztetést a végleges szerződés megkötéséig bármikor, indokolás nélkül, díjmentesen visszavonhatja.</li>
                      <li>Az igényfelmérést követően kiadott végleges ajánlat elfogadását megelőzően a Megrendelő nem köteles a szerződés megkötésére; ebben az esetben a felek között szerződéses jogviszony nem jön létre.</li>
                      <li>A végleges szerződés megkötését követő elállás, felmondás és az azzal kapcsolatos jogkövetkezmények (pl. megkezdett munkálatok díjazása, felmerült költségek) tekintetében az egyedi szerződésben, illetve annak hiányában a Polgári Törvénykönyv vállalkozási, illetve megbízási szerződésre vonatkozó szabályai (Ptk. 6:238–6:248. §, illetve 6:272–6:280. §) az irányadóak.</li>
                      <li>Amennyiben a Megrendelő fogyasztónak minősül és a szerződés a fogyasztó és a vállalkozás közötti szerződések részletes szabályairól szóló 45/2014. (II. 26.) Korm. rendelet hatálya alá tartozó, üzlethelyiségen kívül vagy távollévők között kötött szerződésnek minősül, a Megrendelőt megilletheti a jogszabály szerinti elállási/felmondási jog, amelynek részletes feltételeiről a Szolgáltató a szerződéskötést megelőzően külön tájékoztatást ad.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">7. Szavatosság, jótállás</h2>
                    <ol className={styles.numberedList}>
                      <li>A Szolgáltató a nyújtott informatikai szolgáltatások, valamint az esetlegesen beépített/telepített eszközök tekintetében a Polgári Törvénykönyv és a vonatkozó jogszabályok szerinti szavatossági, illetve – amennyiben alkalmazandó – jótállási kötelezettséget vállal.</li>
                      <li>A jótállás és szavatosság pontos terjedelmét, időtartamát és feltételeit a felek között létrejövő egyedi szerződés tartalmazza.</li>
                      <li>Nem terjed ki a jótállás/szavatosság a Megrendelő általi szakszerűtlen használatból, jogosulatlan harmadik fél általi beavatkozásból, illetve a szolgáltatástól független külső okból (pl. áramkimaradás, internetszolgáltatói hiba, vis maior) eredő hibákra és károkra.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">8. Felelősség korlátozása</h2>
                    <ol className={styles.numberedList}>
                      <li>A Szolgáltató a tőle elvárható szakmai gondossággal jár el, azonban nem felel olyan károkért, amelyek harmadik fél (pl. internetszolgáltató, áramszolgáltató, szoftvergyártó) hibás teljesítéséből, vis maior eseményből, vagy a Megrendelő, illetve munkavállalói által okozott hibás használatból, jogosulatlan rendszermódosításból erednek.</li>
                      <li>A Szolgáltató nem felel az olyan adatvesztésért, amely a Megrendelő által biztosított, nem megfelelő minőségű vagy nem kellően karbantartott hardver-/szoftverkörnyezetből ered, illetve amennyiben a Megrendelő a Szolgáltató által javasolt adatmentési vagy biztonsági megoldást nem vette igénybe.</li>
                      <li>A Szolgáltató felelőssége — amennyiben jogszabály eltérően nem rendelkezik — a szerződésszegéssel okozott, igazolt közvetlen károk tekintetében az adott szolgáltatásra vonatkozó, az érintett szerződéses időszakban megfizetett díj mértékéig terjed.</li>
                      <li>A Szolgáltató nem vállal felelősséget a Weboldal esetleges technikai hibájából vagy átmeneti elérhetetlenségéből eredő közvetett károkért, és nem garantálja, hogy a Weboldal tartalma mindenkor hiánytalan, pontos és a legújabb állapotot tükrözi.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">9. Titoktartás</h2>
                    <p>
                      A Felek kötelezettséget vállalnak arra, hogy a szerződés teljesítése során tudomásukra jutott üzleti titkot, know-how-t, hozzáférési adatokat, illetve egyéb bizalmas információt bizalmasan kezelik, és azt harmadik személy részére nem teszik hozzáférhetővé, kivéve, ha ehhez a másik Fél előzetesen írásban hozzájárult, vagy jogszabály ezt kötelezővé teszi. A Szolgáltató a rendszergazdai/üzemeltetési hozzáférés során tudomására jutó adatokat kizárólag a szerződés teljesítése céljából használja fel.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">10. Szellemi tulajdon</h2>
                    <ol className={styles.numberedList}>
                      <li>A Weboldal teljes tartalma — ideértve különösen, de nem kizárólagosan a szövegeket, grafikai elemeket, logókat, a Weboldal felépítését és forráskódját — a Szolgáltató kizárólagos szellemi tulajdonát képezi, illetve azok tekintetében a Szolgáltató jogosult a felhasználásra.</li>
                      <li>A Weboldal tartalmának bármilyen formában történő máscopy-zása, terjesztése, feldolgozása vagy kereskedelmi célú felhasználása kizárólag a Szolgáltató előzetes, írásbeli hozzájárulásával engedélyezett.</li>
                      <li>A jelen pontban foglaltak megsértése esetén a Szolgáltató jogosult a szerzői jogról szóló 1999. évi LXXVI. törvényben, valamint a Polgári Törvénykönyvben biztosított jogorvoslati eszközök (így különösen kártérítés) igénybevételére.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">11. Adatvédelem</h2>
                    <p>
                      A Weboldal használata, így különösen a kapcsolatfelvételi űrlap kitöltése, valamint a szerződéses jogviszony során megadott személyes adatok kezelésről a Szolgáltató a Weboldalon külön elérhető Adatkezelési Tájékoztatóban ad részletes felvilágosítást, amely jelen ÁSZF elválaszthatatlan mellékletét képezi.
                    </p>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">12. Panaszkezelés</h2>
                    <ol className={styles.numberedList}>
                      <li>A Megrendelő a Szolgáltató tevékenységével, illetve a szolgáltatás nyújtásával kapcsolatos panaszát az 1.1. pontban megjelölt elérhetőségeken (elsősorban a hello@sironic.hu e-mail címen) jelentheti be.</li>
                      <li>A Szolgáltató a beérkezett panaszt kivizsgálja, és arra a vonatkozó jogszabályok (így különösen a fogyasztóvédelemről szóló 1997. évi CLV. törvény, amennyiben a Megrendelő fogyasztónak minősül) szerinti határidőn belül írásban válaszol.</li>
                      <li>Amennyiben a panasz rendezésére a felek között nem kerül sor, a Megrendelő (fogyasztói minőségben eljáró Megrendelő esetén) jogosult a lakóhelye, illetve tartózkodási helye szerint illetékes békéltető testülethez fordulni, vagy igényét bírói úton érvényesíteni.</li>
                    </ol>
                  </section>

                  <section className={styles.section}>
                    <h2 className="heading-2">13. Vegyes és záró rendelkezések</h2>
                    <ol className={styles.numberedList}>
                      <li>Jelen ÁSZF-ben nem szabályozott kérdésekben a magyar jog, így különösen a Polgári Törvénykönyvről szóló 2013. évi V. törvény, a fogyasztóvédelemről szóló 1997. évi CLV. törvény, valamint az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII. törvény rendelkezései az irányadóak.</li>
                      <li>A Szolgáltató fenntartja a jogot jelen ÁSZF egyoldalú módosítására. A módosított ÁSZF a Weboldalon történő közzétételtől hatályos, és a közzétételt megelőzően létrejött szerződéses jogviszonyokat nem érinti.</li>
                      <li>Amennyiben jelen ÁSZF valamely rendelkezése érvénytelennek vagy végrehajthatatlannak bizonyulna, az nem érinti a többi rendelkezés érvényességét.</li>
                      <li>A Felek a jelen ÁSZF-fel, illetve az annak alapján létrejött szerződéses jogviszonyokkal kapcsolatos jogvitáikat elsősorban békés úton, egyeztetés útján kívánják rendezni; ennek eredménytelensége esetén a jogvita elbírálására a hatáskörrel és illetékességgel rendelkező magyar bíróság jogosult.</li>
                    </ol>
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
