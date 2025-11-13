import progress from "../assets/work-in-progress.png";

function SettingsPage() {
  return (
    <div className="flex justify-center items-center w-full h-10/12">
      <img
        src={progress}
        alt="construction"
        className="bg-white w-1/2 md:w-1/3"
      />
    </div>
  );
}

export default SettingsPage;
