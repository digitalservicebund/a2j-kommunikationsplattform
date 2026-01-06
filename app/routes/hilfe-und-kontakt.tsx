import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function HilfeUndKontaktPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.HILFE_UND_KONTAKT_TITLE}>
      <p className="kern-body kern-body--large">
        Donec sodales erat facilisis turpis hendrerit rhoncus. Donec vel
        sollicitudin diam, et dictum libero. In tempor sem sit amet efficitur
        posuere. Cras et mattis est. Ut sit amet dignissim diam, non convallis
        metus. Integer aliquam consequat justo, non bibendum quam pellentesque
        nec. Praesent vitae lorem mattis dolor dictum facilisis. Proin ac mauris
        ac libero accumsan dapibus. Proin velit ipsum, viverra vel libero in,
        luctus pharetra eros.
      </p>
      <p className="kern-body">
        Aliquam ornare scelerisque neque vulputate placerat. Morbi in leo
        elementum, dictum elit eu, viverra risus. In tempus nulla neque, ut
        porta ipsum tristique a. Sed ex mi, euismod ac lacus sed, lacinia
        pulvinar quam. Suspendisse lacinia aliquet lobortis. Praesent a ipsum
        tincidunt, ultricies enim sed, pellentesque nisi. Aenean elementum,
        ipsum eget blandit fermentum, ante sem ornare ex, nec malesuada enim
        dolor non nunc. In mauris diam, volutpat sed tempus in, tempus et enim.
        Mauris viverra, lorem sed pulvinar interdum, nulla dui porttitor erat,
        ac sagittis leo orci sed orci. Mauris rutrum lorem eu leo vehicula
        pellentesque. Integer pretium libero tellus. Vestibulum egestas purus at
        bibendum congue. Duis scelerisque purus in est laoreet maximus. Aliquam
        nec sollicitudin mauris. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Sed dapibus diam sed nulla aliquam, scelerisque
        faucibus purus finibus.
      </p>
      <p className="kern-body kern-body--bold">
        Bibendum quam pellentesque nec. Praesent vitae lorem mattis
      </p>
      <p className="kern-body">
        Mauris justo lectus, iaculis vitae laoreet eu, pulvinar ut magna.
        Aliquam ac egestas sem, non malesuada odio. Pellentesque eu dui pretium,
        commodo purus sed, viverra neque. Sed imperdiet elementum sem eget
        convallis. Fusce dolor neque, venenatis convallis quam nec, venenatis
        maximus lacus. Integer lacinia, urna eget vulputate bibendum, mauris
        justo interdum sapien, et egestas dui nisi id felis. Aliquam molestie
        neque id felis suscipit, nec dignissim ipsum volutpat. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Nullam aliquet massa
        in velit vehicula, eu varius ante venenatis. Nullam vel vehicula neque.
        Cras sollicitudin suscipit fringilla.
      </p>
      <p className="kern-body kern-body--small">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet
        neque vitae arcu ultricies dictum. Nullam lacinia, erat non sollicitudin
        commodo, risus elit imperdiet lectus, ac finibus ipsum sem ac est.
        Aenean ut tellus mi. Vestibulum ante ipsum primis in faucibus orci
        luctus et ultrices posuere cubilia curae; Morbi sit amet enim lorem.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Nunc efficitur tincidunt vulputate. Nulla
        tincidunt condimentum euismod. Suspendisse ac tellus id massa auctor
        faucibus nec non lectus. Fusce faucibus efficitur purus sit amet
        sagittis. Fusce vel massa commodo, lobortis enim nec, ultricies risus.
        Vivamus posuere, turpis eu finibus feugiat, tellus nibh mollis sem, non
        fermentum urna libero sit amet metus. Nam vitae scelerisque neque.
      </p>
      <p className="kern-body">
        Etiam et molestie nisl. Ut quis magna mattis diam pharetra accumsan sed
        ac dolor. Integer tincidunt, sem quis egestas vehicula, turpis dolor
        volutpat justo, vitae dapibus elit dolor vitae dolor. Suspendisse a
        eleifend dolor. Donec in vulputate lorem, sed volutpat tortor. Donec
        efficitur egestas diam vitae accumsan. Etiam id ultrices libero. Sed
        posuere eros in justo consequat facilisis id nec ante. Ut ultrices
        accumsan ornare. Cras eu nisi pharetra eros efficitur aliquet.
      </p>
    </ContentPage>
  );
}
