import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function DatenschutzPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.DATENSCHUTZ_TITLE}>
      <p className="kern-body kern-body--large">
        Nam non pulvinar enim. Nullam orci nunc, fermentum nec gravida sit amet,
        ultricies sed nibh. Aliquam commodo ultricies sodales. Nunc ligula
        lorem, fermentum et accumsan ac, dapibus at tortor. Phasellus fringilla
        mollis arcu, quis congue elit auctor eu.
      </p>
      <p className="kern-body">
        Morbi accumsan tempor nibh et bibendum. Phasellus enim nisl, varius quis
        turpis eleifend, dignissim feugiat diam. Nulla tristique eros ac tellus
        pharetra, vel finibus felis tincidunt. Aliquam luctus ex ac tortor
        dictum, non gravida quam ornare. Donec tincidunt laoreet commodo. Sed
        feugiat malesuada tincidunt. Sed bibendum lobortis tellus eu interdum.
        Ut in interdum felis, non semper mi. Donec in faucibus risus, nec
        vestibulum purus. Quisque at bibendum erat, vitae aliquet urna.
        Curabitur in porta urna.
      </p>
      <p className="kern-body kern-body--small">
        In hac habitasse platea dictumst. Pellentesque eget molestie ipsum.
        Suspendisse dictum velit id ornare fringilla. In sit amet risus et mi
        interdum faucibus nec id erat. Nunc venenatis nibh erat, quis maximus
        dolor suscipit eget. Nulla nec massa vel augue vulputate convallis. Nunc
        non fermentum nulla, ac scelerisque mi. Mauris tincidunt nunc leo, quis
        pretium nisl venenatis eget. Mauris mi metus, facilisis sit amet porta
        in, vestibulum at lectus. Donec eleifend nibh iaculis lobortis sodales.
        Phasellus nec tempor quam. Sed aliquet est a pretium mollis. Ut
        tristique pulvinar nunc id tincidunt.
      </p>
      <p className="kern-body">
        Duis ipsum orci, posuere a vehicula at, gravida in tortor. Maecenas non
        odio tempus, rhoncus erat vel, facilisis ante. Praesent non auctor odio,
        ut consectetur ligula. In imperdiet velit ut lacus imperdiet, ac
        fermentum magna accumsan. Maecenas commodo ultrices est, eget finibus
        sem dictum ac. Pellentesque feugiat vitae felis sit amet tincidunt.
        Donec auctor nunc eu nisi mollis, a euismod arcu varius. Nunc a ex
        ultrices, tristique odio eu, placerat nibh. Proin eu lorem vel dui
        fringilla porttitor. Phasellus ut mi faucibus, blandit lorem in, auctor
        orci. Cras vitae nibh augue.
      </p>
    </ContentPage>
  );
}
