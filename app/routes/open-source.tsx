import ContentPage from "~/components/ContentPage";
import { useTranslations } from "~/services/translations/context";

export default function OpenSourcePage() {
  const { titles } = useTranslations();
  return (
    <ContentPage title={titles.OPEN_SOURCE_CODE_TITLE}>
      <p className="kern-body kern-body--large">
        Fusce vitae augue arcu. Suspendisse ornare et tellus a pretium. Orci
        varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Nullam quis orci sed sem venenatis sagittis. Mauris neque
        felis, pharetra at eleifend et, vehicula convallis est. Fusce viverra
        dictum diam, sed commodo ipsum. Sed feugiat velit non ultricies
        lobortis. Aenean ac lacinia libero. Etiam pellentesque commodo quam, non
        placerat nulla porttitor convallis. Cras dapibus felis id gravida
        interdum. Cras sodales nulla id dui hendrerit dignissim. Fusce porta,
        magna ut iaculis molestie, ante neque vestibulum dolor, nec aliquam
        metus orci nec augue.
      </p>
      <p className="kern-body">
        Duis dictum justo congue turpis ultrices dignissim. Suspendisse vel
        tempor lectus, sed ullamcorper mauris. Fusce in eros ut nibh eleifend
        sodales vel vitae orci. Suspendisse purus tortor, aliquam at lacus quis,
        vulputate faucibus enim. Proin eget metus et turpis suscipit blandit.
        Integer consectetur, lectus ut commodo vestibulum, lorem nisi pharetra
        justo, in bibendum velit leo a neque. Donec eget magna blandit, placerat
        mauris et, placerat turpis. Aliquam erat volutpat. Sed mollis dolor quis
        lectus aliquam dictum. Integer ante ex, auctor a turpis nec, tincidunt
        viverra sapien. Nam lobortis, mi in dictum lobortis, orci nisl consequat
        orci, a elementum libero sapien sed dui. Donec condimentum euismod quam,
        a auctor enim vehicula tempus.
      </p>
      <p className="kern-body kern-body--small">
        Sed fringilla ullamcorper sodales. Nam quis mi eleifend, accumsan leo
        vel, auctor sem. Vivamus eros augue, rutrum a blandit in, semper ut
        nisl. Nunc rhoncus felis at dui malesuada tempus.
      </p>
      <p className="kern-body">
        Nam eleifend vel augue quis ullamcorper. Duis ultrices lectus quis eros
        accumsan sodales. Nam congue iaculis sapien, vitae vestibulum metus
        aliquam faucibus. Aliquam rhoncus nisl eu turpis ornare viverra.
        Maecenas fringilla convallis leo vel congue. Quisque efficitur bibendum
        sapien non hendrerit. Integer fringilla velit non elit imperdiet, vel
        aliquam tellus suscipit. Sed urna tortor, convallis pharetra felis at,
        porttitor maximus nibh. Nam laoreet in orci at tincidunt. Vestibulum
        venenatis pulvinar porta.
      </p>
      <p className="kern-body">
        Integer commodo lorem nec efficitur pulvinar. Nullam efficitur bibendum
        sodales. Nunc gravida, libero ac accumsan rhoncus, nibh neque varius
        tortor, nec maximus sem turpis non orci. Nam varius et leo imperdiet
        pulvinar. Phasellus placerat lectus id ex imperdiet, ut fermentum purus
        luctus. Sed congue, elit eu venenatis ornare, dui libero imperdiet nunc,
        at luctus urna nunc sit amet ante. Vivamus vehicula est nisi, at
        ultricies risus gravida ut. Phasellus vestibulum pharetra aliquam. Cras
        vitae volutpat nunc, eget tempus ipsum. Vivamus eget ipsum at nisi
        facilisis ultrices.
      </p>
    </ContentPage>
  );
}
