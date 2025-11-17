import FormSign from "./formSing";

export default function signup() {
  return (
    <div  className= "min-h-screen bg-linear-to-r from-blue-500 via-purple-500 to-pink-400 flex items-center justify-center flex-col gap-6 ">
      <p className="flex md:text-5xl text-4xl font-semibold justify-center text-white">Trainee Guide</p>
    <div>
      <FormSign/>
    </div>
    </div>
  );
}