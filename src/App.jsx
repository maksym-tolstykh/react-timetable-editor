import { useEffect } from "react";
import { useState } from "react";
const jsonEmpty = [
  {
    startTime: "00:00",
    endTime: "00:00",
    monday: { lesson: "", hyperLink: ""},
    tuesday: { lesson: "", hyperLink: ""},
    wednesday: { lesson: "", hyperLink: ""},
    thursday: { lesson: "", hyperLink: ""},
    friday: { lesson: "", hyperLink: ""},
    saturday: { lesson: "", hyperLink: ""},
  },
]

function App() {
  const [lessonArr, setlessonArr] = useState(jsonEmpty);
  const [isHyperLink, setHyperLink] = useState(false);

  useEffect(() => {
    setlessonArr(
      localStorage.getItem("lessonArr")
        ? JSON.parse(localStorage.getItem("lessonArr"))
        : jsonEmpty
    );
  }, []);

  const addRow = () => {
    console.log("addRow");
    setlessonArr([
      ...lessonArr,
      {
        startTime: "00:00",
        endTime: "00:00",
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
      },
    ]);
    // localStorage.setItem("lessonArr", JSON.stringify(newArr));
  };

  const changeLessonData = (e, index, day) => {
    e.preventDefault();
    const newArr = [...lessonArr];
    newArr[index] = {
      ...newArr[index],
      [day]: e.target.value,
    };
    setlessonArr(newArr);
    //console.log(lessonArr);
    localStorage.setItem("lessonArr", JSON.stringify(newArr));
  };

  const changeTimeData = (e, index, timePos) => {
    e.preventDefault();
    console.log(typeof e.target.value);
    const newArr = [...lessonArr];
    newArr[index] = {
      ...newArr[index],
      [timePos]: e.target.value,
    };
    setlessonArr(newArr);
    //console.log(newArr);
    localStorage.setItem("lessonArr", JSON.stringify(newArr));
  };

  const exportToJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(lessonArr));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "schedule.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Option Menu */}
        <div>
          <label htmlFor="hyperLink">Is Hyper Link </label>
          <input
            type="checkbox"
            value={isHyperLink}
            name="hyperLink"
        
            onChange={() => {
              setHyperLink(!isHyperLink);
            }}
          />
          <button onClick={exportToJson}>Export to Json</button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Номер
              </th>
              <th scope="col" className="px-6 py-3">
                Час
              </th>
              <th scope="col" className="px-6 py-3">
                Понеділок
              </th>
              <th scope="col" className="px-6 py-3">
                Вівторок
              </th>
              <th scope="col" className="px-6 py-3">
                Середа
              </th>
              <th scope="col" className="px-6 py-3">
                Четвер
              </th>
              <th scope="col" className="px-6 py-3">
                {`П'ятниця`}
              </th>
              <th scope="col" className="px-6 py-3">
                {`Субота`}
              </th>
            </tr>
          </thead>
          <tbody>
            {lessonArr.map((lesson, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <h4>{index + 1}</h4>
                </td>
                {/* Time */}
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="flex">
                    <span>Початок: </span>
                    <input
                      type="time"
                      value={lesson.startTime}
                      onChange={(e) => {
                        changeTimeData(e, index, "startTime");
                      }}
                    />
                  </div>

                  <div className="flex">
                    <span>Кінець: </span>
                    <input
                      type="time"
                      value={lesson.endTime}
                      onChange={(e) => {
                        changeTimeData(e, index, "endTime");
                      }}
                    />
                  </div>
                </th>
                {/* monday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.monday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "monday");
                    }}
                  />
                  {isHyperLink && (
                    <input
                      type="text"
                      placeholder="hyperLink"
                      defaultValue={lesson?.hyperLink}
                      onChange={(e) => {
                        changeLessonData(e, index, "hyperLink");
                      }}
                    />
                  )}
                </td>
                {/* tuesday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.tuesday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "tuesday");
                    }}
                  />
                </td>
                {/* wednesday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.wednesday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "wednesday");
                    }}
                  />
                </td>
                {/* thursday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.thursday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "thursday");
                    }}
                  />
                </td>
                {/* friday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.friday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "friday");
                    }}
                  />
                </td>
                {/* saturday */}
                <td className="px-6 py-4">
                  <input
                    type="text"
                    className="border-black	border-2"
                    defaultValue={lesson.saturday.lesson}
                    onChange={(e) => {
                      changeLessonData(e, index, "saturday");
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <button onClick={addRow}>Додати поле</button>
        </div>
      </div>
    </>
  );
}

export default App;
