import Alert from "~/components/Alert";
import { useTranslations } from "~/services/translations/context";

export default function Uebersicht() {
  const { labels, alerts } = useTranslations();
  return (
    <>
      <h1 className="kern-heading-medium">{labels.UEBERSICHT_LABEL}</h1>
      <Alert
        type="info"
        title={alerts.WORK_IN_PROGRESS_TITLE}
        message={alerts.WORK_IN_PROGRESS_MESSAGE}
      />

      <br />
      <p className="kern-body">
        Maecenas iaculis tortor sit amet nisi laoreet egestas. Nullam luctus
        odio quis sapien aliquam tincidunt. Nulla varius interdum lobortis.
        Fusce et consectetur nunc. Nunc eleifend porta neque, vel aliquam justo
        efficitur fermentum. Aenean purus tortor, consequat sit amet fringilla
        a, tempus a metus. Proin in ipsum et urna tristique malesuada ut at
        urna. Morbi nec ultricies nisi. In dapibus turpis orci, vel varius
        turpis posuere eget. Sed tincidunt nec nibh ut auctor. Donec sit amet
        lacinia sapien. Sed ullamcorper, urna vitae aliquam suscipit, sem risus
        vulputate diam, nec mollis odio sapien vitae elit. Sed a ex ac purus
        luctus hendrerit. Maecenas accumsan, nisl et dapibus fermentum, magna
        sapien rhoncus elit, id molestie tellus diam nec tortor.
      </p>
      <p className="kern-body">
        Cras egestas sapien ut diam suscipit fringilla. Donec tincidunt sed
        tortor nec fringilla. Nunc mollis cursus ipsum id vestibulum. Class
        aptent taciti sociosqu ad litora torquent per conubia nostra, per
        inceptos himenaeos. Duis vel massa ac ipsum finibus gravida at vel
        mauris. Donec ac nibh ut justo cursus accumsan ut ut metus. Aliquam erat
        volutpat. Duis sed ultrices massa. Ut elementum risus sit amet diam
        consequat dignissim congue eget ante.
      </p>
      <p className="kern-body">
        Maecenas convallis nisl et est tempus, et cursus orci egestas. Aliquam
        mi arcu, tempor nec volutpat in, ornare non nunc. Aliquam lobortis
        turpis a magna efficitur tempus. Mauris vel risus turpis. Nullam et
        massa nec leo volutpat ultricies. Proin porta cursus placerat. Fusce
        vehicula ornare ante, tincidunt dapibus dolor hendrerit nec. Nam massa
        dolor, lobortis sit amet quam eget, suscipit dapibus sapien. Fusce
        tempus suscipit enim maximus imperdiet. Curabitur fringilla purus id
        vehicula volutpat. Duis a turpis metus. Nulla lectus lorem, pellentesque
        luctus mi ut, mattis pharetra felis.
      </p>
      <p className="kern-body">
        Proin iaculis dui id tincidunt aliquam. Cras sagittis elit tellus, a
        elementum diam congue a. In luctus iaculis nulla, eu convallis tellus
        aliquam nec. Nunc volutpat libero ut erat suscipit, semper rutrum purus
        egestas. Mauris cursus mi nec enim viverra egestas. Praesent sed
        tincidunt lectus. Praesent condimentum pulvinar mi, a finibus quam
        venenatis quis. Ut tempus semper diam, sit amet consectetur turpis
        consectetur ac. Ut nec dolor eu orci lobortis ultrices. Nullam euismod
        lectus nec ligula rutrum, quis convallis tortor elementum. Vivamus
        lacinia blandit ligula, ac blandit mauris posuere sed. Nulla mollis
        turpis sed massa molestie ultrices. Aliquam et est quis eros tincidunt
        vestibulum volutpat nec eros. Sed condimentum malesuada urna et mattis.
        In hac habitasse platea dictumst.
      </p>
      <p className="kern-body kern-body--small">
        Proin euismod, lacus ut mollis luctus, ante libero congue leo, nec
        consectetur ex orci non nibh. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Sed a justo id metus
        ullamcorper semper eget a ante. Nam tristique scelerisque euismod.
        Aenean lacinia euismod finibus. Cras a interdum nulla. Nam egestas a mi
        quis tempor. Praesent et mollis magna, at sagittis neque.
      </p>
    </>
  );
}
