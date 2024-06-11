

const FormCard = () => {
  return (
    <div className="flex flex-col justify-between min-h-[150px] w-full bg-fourth-light p-2 shadow-fourth-light border-2">
      <div className="flex justify-between">
        <div>
          <h1>TITLE</h1>
          <h2>Description</h2>
        </div>
        <h3>STATUS</h3>
      </div>
      <div className="flex justify-between">
        <div>
            <h1>File</h1>
        </div>
        <p><span className="hidden md:inline-block">submitted</span> 31 out of 100</p>
      </div>
    </div>
  );
}

export default FormCard;