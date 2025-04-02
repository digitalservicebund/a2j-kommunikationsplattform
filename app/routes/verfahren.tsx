import { useState } from "react";
import {
  type ActionFunctionArgs,
  Link,
  Outlet,
  useLoaderData,
  useNavigation,
} from "react-router";
import { getFormDataFromRequest } from "~/services/fileUpload.server";
// import { requireUserSession } from "~/services/session.server";
import { justizBackendService } from "~/services/servicesContext.server";

export async function loader() {
  // await requireUserSession(request);
  const verfahren = await justizBackendService.getAllVerfahren(10, 0);
  return verfahren;
}

export async function action({ request }: ActionFunctionArgs) {
  // await requireUserSession(request);
  const formData = await getFormDataFromRequest(request);

  const xjustiz = formData.get("xjustiz") as File;
  const files = formData.getAll("files") as File[];

  await justizBackendService.createVerfahren(xjustiz, files);

  return null;
}

export default function Verfahren() {
  return (
    <ContentContainer>
      <div className="flex gap-8 items-center mt-40">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.3 22C2.695 22 2.17708 21.7846 1.74625 21.3538C1.31542 20.9229 1.1 20.405 1.1 19.8V7.3975C0.77 7.19583 0.504167 6.93458 0.3025 6.61375C0.100833 6.29292 0 5.92167 0 5.5V2.2C0 1.595 0.215417 1.07708 0.64625 0.64625C1.07708 0.215417 1.595 0 2.2 0H19.8C20.405 0 20.9229 0.215417 21.3538 0.64625C21.7846 1.07708 22 1.595 22 2.2V5.5C22 5.92167 21.8992 6.29292 21.6975 6.61375C21.4958 6.93458 21.23 7.19583 20.9 7.3975V19.8C20.9 20.405 20.6846 20.9229 20.2538 21.3538C19.8229 21.7846 19.305 22 18.7 22H3.3ZM3.3 7.7V19.8H18.7V7.7H3.3ZM2.2 5.5H19.8V2.2H2.2V5.5ZM8.8 13.2H13.2C13.5117 13.2 13.7729 13.0946 13.9838 12.8838C14.1946 12.6729 14.3 12.4117 14.3 12.1C14.3 11.7883 14.1946 11.5271 13.9838 11.3163C13.7729 11.1054 13.5117 11 13.2 11H8.8C8.48833 11 8.22708 11.1054 8.01625 11.3163C7.80542 11.5271 7.7 11.7883 7.7 12.1C7.7 12.4117 7.80542 12.6729 8.01625 12.8838C8.22708 13.0946 8.48833 13.2 8.8 13.2Z"
            fill="#0073A8"
          />
        </svg>
        <h1 className={"text-2xl font-semibold break-all"}>Verfahren</h1>
      </div>
      <div className="flex flex-col items-start">
        <CreateVerfahren />
        <ListVerfahren />
      </div>
    </ContentContainer>
  );
}

function ContentContainer({ children }: { children: React.ReactNode }) {
  return <main className="px-40 md:px-128">{children}</main>;
}

function ListVerfahren() {
  const verfahren = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleSidebar = (id: string) => {
    setExpanded((prevExpanded) => {
      const isExpanded = prevExpanded !== id;
      return isExpanded ? id : null;
    });
  };

  if (!verfahren) {
    return null;
  }

  return (
    <div className="mt-14 flex flex-col gap-24 w-full">
      {verfahren.map((v) => (
        <div
          key={v.id}
          className="flex border-2 border-gray-500 p-24"
          data-testid="verfahren-item"
        >
          <div className="w-full">
            <div className="font-bold text-3xl">{v.aktenzeichen}</div>
            <div className="text-sm text-gray-500">Aktenzeichen</div>

            <div className="grid grid-cols-2 gap-y-2  mt-24">
              <div className="text-xl">{v.status}</div>
              <div className="text-xl">
                {new Date(v.status_changed).toLocaleDateString("de-DE")}
              </div>
              <div className="text-sm text-gray-500">Einreichungsstatus</div>

              <div className="text-sm text-gray-500">Zuletzt geändert</div>
            </div>

            {expanded === v.id && (
              <div className="mt-20">
                {navigation.state === "loading" ? (
                  <div>Datenraum wird geladen...</div>
                ) : (
                  <Outlet />
                )}
              </div>
            )}
          </div>
          <Link
            to={`/verfahren/${v.id}`}
            onClick={() => toggleSidebar(v.id)}
            preventScrollReset={true}
            className="items-stretch cursor-pointer pl-24 border-l-2 border-gray-300 flex"
          >
            <div className="my-auto">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-24 w-24 text-gray-500 transition-transform ${expanded === v.id ? "rotate-180" : ""}`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.5002 19.85C15.6558 19.9056 15.8225 19.9333 16.0002 19.9333C16.178 19.9333 16.3447 19.9056 16.5002 19.85C16.6558 19.7945 16.8002 19.7 16.9336 19.5667L23.0669 13.4333C23.3113 13.1889 23.4336 12.8778 23.4336 12.5C23.4336 12.1222 23.3113 11.8111 23.0669 11.5667C22.8225 11.3222 22.5113 11.2 22.1336 11.2C21.7558 11.2 21.4447 11.3222 21.2002 11.5667L16.0002 16.7667L10.8002 11.5667C10.5558 11.3222 10.2447 11.2 9.86689 11.2C9.48912 11.2 9.17801 11.3222 8.93356 11.5667C8.68912 11.8111 8.56689 12.1222 8.56689 12.5C8.56689 12.8778 8.68912 13.1889 8.93356 13.4333L15.0669 19.5667C15.2002 19.7 15.3447 19.7945 15.5002 19.85Z"
                  fill="#0073A8"
                />
              </svg>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

function CreateVerfahren() {
  const [xjustizSelected, setXjustizSelected] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

  return (
    <>
      {!formVisible && (
        <button
          onClick={toggleFormVisibility}
          className="ds-button mt-20"
          data-testid="create-verfahren-button"
        >
          Neue Klage einreichen
        </button>
      )}
      {formVisible && (
        <form
          method="post"
          encType="multipart/form-data"
          action="/verfahren"
          className="relative"
        >
          <h2 className="text-xl font-bold mt-24 mb-10">Klage einreichen</h2>
          <button
            onClick={toggleFormVisibility}
            className="absolute top-0 right-0 mt-2 mr-2 text-red-500"
          >
            X
          </button>
          <div className="flex flex-col gap-4 border-2 rounded border-dashed border-[#0073A8] px-40 py-20">
            <label className="font-bold" htmlFor="xjustiz">
              XJustiz-Datei <span className="text-red-500">*</span>
            </label>
            <input
              className={`border-2 border-black-300 p-10 hover:border-blue-600 ${xjustizSelected ? "border-green-500" : ""}`}
              type="file"
              accept=".xml"
              name="xjustiz"
              id="xjustiz"
              onChange={(e) =>
                setXjustizSelected((e?.target?.files?.length || 0) > 0)
              }
            />
            <label className="font-bold" htmlFor="files">
              Anhänge
            </label>

            <input
              className={`border-2 border-black-300 p-10 hover:border-blue-600 ${filesSelected ? "border-green-500" : ""}`}
              type="file"
              name="files"
              id="files"
              multiple
              onChange={(e) =>
                setFilesSelected((e?.target?.files?.length || 0) > 0)
              }
            />
          </div>

          <button
            type="submit"
            className={`ds-button mt-20 ${xjustizSelected ? "" : "hidden is-disabled"}`}
            disabled={!xjustizSelected}
            data-testid="submit-verfahren-button"
          >
            Klage einreichen
          </button>
        </form>
      )}
    </>
  );
}
