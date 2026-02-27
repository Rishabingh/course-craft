import { MdEdit, MdDeleteOutline, MdDragIndicator, MdOutlineOndemandVideo, MdAdd } from 'react-icons/md';


interface Section {
    id: string;
    title: string;
    lectures: { id: string, title: string, duration: string }[];
  }

interface CurriculumParams {
  section: Section;
  actions: () => void
}

const AdminCurriculumSection = (data: CurriculumParams) => {
  const {section, actions} = data;
  const index = 0;
  return (
    <div
      key={section.id}
      className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm"
    >
      {/* Section Header */}
      <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-200 flex items-center justify-between group">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-900">
            Section {index + 1}: {section.title}
          </span>
          <button className="text-neutral-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <MdEdit />
          </button>
        </div>
        <button className="text-neutral-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-lg">
          <MdDeleteOutline />
        </button>
      </div>

      {/* Lectures List */}
      <div className="p-4 flex flex-col gap-3">
        {section.lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="flex items-center justify-between bg-white border border-neutral-200 p-3 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group"
          >
            {/* Left side: Drag handle, Icon, Title */}
            <div className="flex items-center gap-3">
              <MdDragIndicator className="text-neutral-300 cursor-grab hover:text-neutral-500" />
              <div className="bg-indigo-50 p-1.5 rounded-md text-indigo-600">
                <MdOutlineOndemandVideo />
              </div>
              <span className="text-sm font-medium text-neutral-700">{lecture.title}</span>
            </div>

            {/* Right side: Duration & Actions */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                {lecture.duration}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-neutral-400 hover:text-indigo-600 p-1">
                  <MdEdit />
                </button>
                <button className="text-neutral-400 hover:text-red-600 p-1">
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Video Button (Inside Section) */}
        <button
          onClick={() => actions}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-3 rounded-lg border-2 border-dashed border-indigo-100 transition-colors"
        >
          <MdAdd className="text-lg" /> Add Video Lecture
        </button>
      </div>
    </div>
  );
};

export default AdminCurriculumSection;
