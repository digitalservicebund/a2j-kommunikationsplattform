import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function ImpressumPage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.IMPRESSUM_TITLE}>
      <p className="kern-body kern-body--large">
        Praesent non consectetur felis. Vestibulum vel vulputate urna.
      </p>
      <p className="kern-body">
        Duis hendrerit pulvinar dolor quis rhoncus. Donec in leo in purus
        facilisis scelerisque. Vivamus dictum nunc metus, vel rhoncus ligula
        semper sit amet. Quisque sed justo sodales, pulvinar tortor nec,
        lobortis mi. Ut vitae ex maximus, tincidunt quam in, suscipit eros.
        Mauris bibendum dui arcu, euismod molestie lacus tincidunt eu. Maecenas
        vulputate lorem sed nisl tristique, id ultrices arcu finibus.
      </p>
      <p className="kern-body kern-body--small">
        Ut efficitur ornare tortor, vitae rhoncus erat suscipit et. In at odio
        vel orci consectetur tincidunt. Orci varius natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Cras imperdiet, nisi vel
        iaculis sollicitudin, dui odio ultrices leo, ut facilisis diam nunc
        vitae orci. Nulla tortor mauris, ultricies sit amet turpis a, feugiat
        dictum sapien. Vestibulum placerat metus ut pretium pellentesque.
        Vestibulum sed risus accumsan, mattis eros ut, finibus felis. Vestibulum
        pellentesque ultricies est, at maximus turpis faucibus a. Suspendisse
        tincidunt, quam non ullamcorper rhoncus, felis nisl luctus tellus,
        lacinia euismod metus est at erat. Phasellus dapibus, dolor a rutrum
        accumsan, nisi felis sollicitudin lacus, ut elementum lectus dui vel
        ante.
      </p>
      <p className="kern-body">
        Integer orci ipsum, aliquam eget faucibus sit amet, faucibus at eros.
        Morbi varius ac arcu in blandit. Donec non elit a ante sagittis egestas
        ut quis nibh. Proin vehicula ipsum ac ex sagittis, a viverra libero
        fringilla. Quisque lectus massa, laoreet eget turpis sit amet, tincidunt
        euismod lorem. Maecenas non mauris congue, pretium erat ac, pulvinar
        turpis. Nam ac pulvinar erat, sit amet ornare risus. Vestibulum ante
        ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Duis pulvinar mattis mauris suscipit vehicula. Nam aliquet dignissim
        nisi, nec commodo lacus. Sed a porttitor nunc. Aenean semper efficitur
        ipsum at faucibus. Vivamus vulputate ipsum eget accumsan consequat.
        Suspendisse potenti. Sed posuere lorem neque, eget aliquam turpis
        vehicula id. Fusce sit amet enim convallis lacus ullamcorper accumsan.
      </p>
      <p className="kern-body">
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
