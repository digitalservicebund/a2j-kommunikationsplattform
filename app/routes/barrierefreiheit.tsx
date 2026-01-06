import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function BarrierefreiheitPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.BARRIEREFREIHEIT_TITLE}>
      <p className="kern-body kern-body--large">
        Suspendisse et condimentum tellus. Etiam sagittis consectetur
        scelerisque. Mauris ut viverra ipsum, ac tincidunt nibh. Nam sit amet
        massa vel purus porttitor eleifend. Pellentesque odio ligula, euismod ac
        mattis vitae, laoreet et mauris. Pellentesque ut porta ipsum. Praesent
        accumsan odio a elit lacinia, a placerat libero convallis. Orci varius
        natoque penatibus et magnis dis parturient montes, nascetur ridiculus
        mus. Aenean efficitur mauris odio, sed consequat lectus tincidunt vitae.
        Pellentesque nec lectus et orci sollicitudin ultricies.
      </p>
      <p className="kern-body">
        Sed nec sem a augue tristique vulputate maximus eget nisl. Aliquam
        iaculis ac purus sit amet congue. Praesent a velit in felis fermentum
        tempor quis in tortor. Phasellus rhoncus eleifend nibh ac dictum.
        Pellentesque vel finibus magna. Duis vel commodo metus. Fusce leo nunc,
        commodo vel venenatis ac, dignissim sit amet velit. Proin congue, magna
        sit amet ultricies scelerisque, mauris ante aliquet orci, in semper
        mauris libero nec velit. In ut purus id mauris rutrum euismod.
      </p>
      <p className="kern-body kern-body--small">
        Ut consectetur mauris id efficitur pulvinar. Cras laoreet consectetur
        nisi. Cras sed libero molestie, porttitor orci ut, mollis leo. Aliquam
        non dui ex. In in ipsum metus. Nulla vehicula mauris nec felis maximus
        sollicitudin. Maecenas ac dignissim urna, mattis vestibulum magna.
      </p>
      <p className="kern-body">
        Nunc id elit venenatis, pretium neque eget, aliquet quam. Pellentesque
        nec massa in augue egestas dictum. Donec rhoncus nisl est, eu suscipit
        nunc tincidunt sit amet. Curabitur vulputate nibh velit, in porttitor
        risus vestibulum consectetur. Aliquam gravida dapibus dapibus. Cras nec
        dui lorem. Quisque at lacus nunc. Ut convallis sem sed enim venenatis
        ultrices. Morbi aliquet metus a est vulputate, at elementum turpis
        imperdiet. Phasellus nibh purus, tristique ac turpis id, pharetra
        porttitor massa. Vestibulum lectus ante, consectetur non finibus quis,
        consectetur id justo. Vestibulum tristique consequat magna quis
        interdum.
      </p>
      <p className="kern-body">
        Quisque faucibus libero ut erat ultricies varius. Donec vulputate arcu
        ante, vel interdum dui rhoncus ac. Mauris a tortor eget neque convallis
        rhoncus eu sit amet felis. Donec vestibulum leo sapien, eget cursus
        metus euismod sit amet. Sed laoreet nunc sed lorem interdum sagittis.
        Vestibulum sed tortor ac ligula finibus semper. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit.
      </p>
    </ContentPage>
  );
}
