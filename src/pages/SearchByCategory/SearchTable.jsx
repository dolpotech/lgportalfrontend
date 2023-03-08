import React from "react";

export default function SearchTable({ commentsData, type }) {
  const [districts, setDistricts] = useState();
  const [districtId, setDistrictId] = useState();
  const [lg, setLg] = useState();
  const [lgId, setLgId] = useState();
  const [lgData, setLgData] = useState();
  const [searchCategoryData, setSearchCategoryData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [headerData, setHeaderData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [toggleTable, setToggleTable] = useState(true);

  const ITEMS_PER_PAGE = 30;
  const headers = [];
  useEffect(() => {
    setHeaderData(headers);
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    type == "staff" &&
      headers.push(
        { name: "ID", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: false },
        { name: "Designations", field: "design", sortable: false },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone", field: "phone", sortable: true },
        { name: "Photo", field: "photo", sortable: true }
      );
    type == "2" &&
      headers.push({
        name: "Documents Type",
        field: "type",
        sortable: false,
      });
    setHeaderData(headers);
  }, [type]);

  const commentsData = useMemo(() => {
    let computedComments = comments;

    if (search) {
      computedComments = computedComments.filter(
        (comment) => comment.Title.toLowerCase().includes(search.toLowerCase())
        // ||
        // comment.img.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedComments.length);

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [comments, currentPage, search, sorting]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  return (
    <div>
      {commentsData == "" ? (
        ""
      ) : toggleTable ? (
        <table className="info-table w-full">
          <HeaderTable
            headers={headerData}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {commentsData &&
              commentsData.map((value, i) =>
                // Type 1
                type == "staff" ? (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{value.title}</td>
                    <td className="px-6 py-4">{value.designation}</td>
                    <td className="px-6 py-4">{value.email}</td>
                    <td className="px-6 py-4">{value.phone}</td>
                    <td className="px-6 py-4">
                      <div
                        className="w-10"
                        dangerouslySetInnerHTML={{ __html: value.photo }}
                      />
                    </td>
                  </tr>
                ) : // Type 2
                type == "document" ? (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{value.title}</td>
                    <td className="px-6 py-4">{value.designation}</td>
                    <td className="px-6 py-4">{value.email}</td>
                    <td className="px-6 py-4">{value.phone}</td>
                    <td className="px-6 py-4">
                      <div
                        className="w-10"
                        dangerouslySetInnerHTML={{ __html: value.photo }}
                      />
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
          </tbody>
        </table>
      ) : (
        <div className="grid grid-cols-6 gap-2">
          {commentsData &&
            commentsData.map((value) =>
              type == "staff" ? (
                <Card padding="true">
                  <div className="m-auto bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                    <a href="#">
                      {value.photo === "" ? (
                        <img src={logo} alt="" className="w-full h-full" />
                      ) : (
                        <div
                          className="w-full h-full overflow-hidden innerHtmlWrapper"
                          dangerouslySetInnerHTML={{
                            __html: value.photo,
                          }}
                        />
                      )}
                    </a>
                    <div className="p-5 divide-x-2">
                      <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {value.title}
                        </h5>
                      </a>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        l
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                ""
              )
            )}
        </div>
      )}
    </div>
  );
}
