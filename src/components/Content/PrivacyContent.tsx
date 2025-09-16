export default function PrivacyContent() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-10">
      <h1 className="text-4xl font-light mb-6">Zásady ochrany osobních údajů</h1>

      <div className="font-light text-black space-y-5 leading-relaxed">
        <p>
          Spektrum galerie, se sídlem v Brně, je správcem osobních údajů shromážděných
          prostřednictvím tohoto webu (<em>dále jen „správce“</em>).
        </p>

        <h2 className="text-2xl font-light mt-6">Jaké údaje zpracováváme</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>E-mailová adresa</strong> – pouze v případě, že se přihlásíte k odběru newsletteru.
          </li>
          <li>
            <strong>Soubory cookies</strong> – používáme pouze nezbytné cookies nutné pro
            správné fungování webu (bez sledování návštěvnosti či marketingu).
          </li>
        </ul>

        <h2 className="text-2xl font-light mt-6">Účel zpracování</h2>
        <p>
          E-mailová adresa je využívána výhradně k zasílání newsletteru s informacemi o výstavách
          a aktivitách galerie. Nezbytné cookies slouží pouze k technickému zajištění provozu webu.
        </p>

        <h2 className="text-2xl font-light mt-6">Doba uchování</h2>
        <p>
          Údaje uchováváme po dobu, po kterou jste přihlášeni k odběru newsletteru. Z odběru se
          můžete kdykoli odhlásit kliknutím na odkaz v patičce každého e-mailu.
        </p>

        <h2 className="text-2xl font-light mt-6">Předávání třetím osobám</h2>
        <p>
          Pro rozesílku newsletteru využíváme službu Ecomail. E-mailové adresy jsou předávány pouze
          za účelem doručení newsletteru a nejsou poskytovány dalším stranám.
        </p>

        <h2 className="text-2xl font-light mt-6">Vaše práva</h2>
        <p>
          Máte právo na přístup ke svým údajům, jejich opravu či výmaz, právo vznést námitku proti
          zpracování a právo podat stížnost u Úřadu pro ochranu osobních údajů.
        </p>

        <h2 className="text-2xl font-light mt-6">Kontakt</h2>
        <p>
          V případě dotazů se na nás obraťte na{" "}
          <a className="underline" href="mailto:hello@spektrumgalerie.cz">
            hello@spektrumgalerie.cz
          </a>.
        </p>
      </div>
    </div>
  );
}
