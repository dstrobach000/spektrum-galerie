import BrandMediaRow from "@/components/Layout/BrandMediaRow";

export default function PrivacyContent() {
  return (
    <div className="w-full relative">
      <div className="relative max-w-[1200px] mx-auto">
        <BrandMediaRow className="mb-6" />

        <h1 className="text-2xl md:text-4xl font-light mb-6">Zásady ochrany osobních údajů</h1>

        <div className="font-light text-black space-y-5 leading-relaxed text-base md:text-lg">
        <p>
          Spektrum galerie, se sídlem v Brně, je správcem osobních údajů shromážděných
          prostřednictvím tohoto webu (dále jen &ldquo;správce&rdquo;).
        </p>

        <h2 className="text-xl md:text-2xl font-light mt-6">Jaké údaje zpracováváme</h2>
        <div className="border border-black rounded-xl p-4 space-y-3">
          <div>
            <span className="font-light">E-mailová adresa</span> – pouze v případě, že se přihlásíte k odběru newsletteru.
          </div>
          <div>
            <span className="font-light">Soubory cookies</span> – používáme pouze nezbytné cookies nutné pro
            správné fungování webu (bez sledování návštěvnosti či marketingu).
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-light mt-6">Účel zpracování</h2>
        <p>
          E-mailová adresa je využívána výhradně k zasílání newsletteru s informacemi o výstavách
          a aktivitách galerie. Nezbytné cookies slouží pouze k technickému zajištění provozu webu.
        </p>

        <h2 className="text-xl md:text-2xl font-light mt-6">Doba uchování</h2>
        <p>
          Údaje uchováváme po dobu, po kterou jste přihlášeni k odběru newsletteru. Z odběru se
          můžete kdykoli odhlásit kliknutím na odkaz v patičce každého e-mailu.
        </p>

        <h2 className="text-xl md:text-2xl font-light mt-6">Předávání třetím osobám</h2>
        <p>
          Pro rozesílku newsletteru využíváme službu Ecomail. E-mailové adresy jsou předávány pouze
          za účelem doručení newsletteru a nejsou poskytovány dalším stranám.
        </p>

        <h2 className="text-xl md:text-2xl font-light mt-6">Vaše práva</h2>
        <p>
          Máte právo na přístup ke svým údajům, jejich opravu či výmaz, právo vznést námitku proti
          zpracování a právo podat stížnost u Úřadu pro ochranu osobních údajů.
        </p>

        <h2 className="text-xl md:text-2xl font-light mt-6">Kontakt</h2>
        <p>
          V případě dotazů se na nás obraťte na{" "}
          <a className="underline" href="mailto:hello@spektrumgalerie.cz">
            hello@spektrumgalerie.cz
          </a>.
        </p>
        </div>
      </div>
    </div>
  );
}
