
interface HeadProps {
  actionName?: string;
  title?:string;
  actionName2?: string;
   onAction?: () => void;
   onAction2?: () => void;
}

const Head = ({ actionName,title="Project Management Tool" ,onAction ,actionName2="Go Back" , onAction2}: HeadProps) => {
  return (
      <div className=" mx-auto p-4">
      <div className="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-4 border">

        <h1 className="text-xl font-semibold text-gray-800">
          Welcome Shahbaz 👋 | {title}
        </h1>

        <div className="flex gap-2">
        {actionName && (
          <button 
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
            {actionName}
          </button>
        )}
          <button 
            onClick={onAction2}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer">
            {actionName2}
          </button>
          </div>
    </div>
    </div>
  )
}

export default Head
