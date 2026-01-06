import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function WeitereInformationenPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.WEITERE_INFORMATIONEN_TITLE}>
      <p className="kern-body kern-body--large">
        Donec fermentum varius dui, vel congue risus maximus a. Ut vulputate,
        enim sit amet congue vulputate, orci enim condimentum velit.
      </p>
      <p className="kern-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dapibus
        ullamcorper risus, in tristique lorem sagittis non. Maecenas quis felis
        at diam placerat pretium sed vulputate mi. Donec fermentum varius dui,
        vel congue risus maximus a. Ut vulputate, enim sit amet congue
        vulputate, orci enim condimentum velit, ac vestibulum velit lectus a
        dui. Nulla facilisi. Aenean quis dolor et ligula accumsan aliquet id et
        diam. Sed vitae pellentesque quam.
      </p>
      <p className="kern-body">
        Nam metus urna, faucibus non lobortis eget, ornare ac turpis. Vivamus
        malesuada, diam vulputate mattis dignissim, arcu tellus auctor dui, et
        fringilla lacus felis non elit. Curabitur posuere, eros ut ornare
        tempus, est elit scelerisque eros, ac porttitor mi enim id est.
        Curabitur molestie pulvinar nulla, vitae tincidunt massa fringilla nec.
        Mauris laoreet quam a orci rutrum, a molestie dui volutpat. Nunc
        ultrices sodales nulla in semper. Donec venenatis sit amet sapien quis
        pharetra. Suspendisse potenti. Duis feugiat, erat in porta laoreet,
        purus lorem convallis odio, ac dignissim leo quam at massa. Nulla et
        lorem ligula. Nunc id nisl in dolor consectetur consectetur. Ut sed
        cursus sapien.
      </p>
      <p className="kern-body kern-body--small">
        Vestibulum consequat vestibulum facilisis. Sed mattis sapien bibendum,
        eleifend urna sit amet, molestie ipsum. Praesent imperdiet vehicula
        tellus, in fermentum mi varius a. In eget nibh nibh. Fusce feugiat
        tincidunt metus ut sagittis. Fusce facilisis ipsum a quam blandit
        convallis in quis ligula. Quisque vel turpis sapien. In nec tincidunt
        ex, ac efficitur erat. Sed imperdiet nunc id diam semper, non placerat
        augue mollis. Donec quis diam massa. Mauris ullamcorper ut turpis a
        fermentum. Quisque pulvinar feugiat euismod. Phasellus euismod pulvinar
        pharetra. Pellentesque condimentum tempus nulla, ut luctus orci
        convallis cursus.
      </p>
      <p className="kern-body">
        Vivamus imperdiet aliquet orci non sodales. Curabitur eu convallis mi,
        in luctus turpis. Pellentesque sodales nisl ultricies lacus euismod
        tincidunt. Aenean luctus mattis enim in malesuada. Praesent blandit,
        arcu ullamcorper dapibus venenatis, velit urna egestas orci, vitae
        egestas tellus nibh at sapien. Maecenas pretium feugiat eros, eu
        condimentum dolor tempus non. Curabitur volutpat velit quis nibh
        molestie volutpat. Morbi et varius leo, eget cursus leo. Nam et
        malesuada nisi, vitae pharetra sem. Nullam vel feugiat felis, non
        maximus augue. Nulla blandit, augue id rutrum commodo, arcu velit
        viverra nunc, vel dignissim mi felis a tellus. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia curae.
      </p>
    </ContentPage>
  );
}
