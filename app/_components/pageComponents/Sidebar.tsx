import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="bg-white w-51 h-screen">
      <div className="mx-5 my-9 inter">
        {/* header */}
        <div className="w-41 h-11 gap-2 flex">
          <img src="/Logo.svg" />
          <div>
            <div className="text-foreground font-semibold text-lg">NomNom</div>
            <div className="text-muted-foreground font-normal text-xs ">
              Swift delivery
            </div>
          </div>
        </div>
        {/* header end */}

        {/* black button */}
        <Button className="mt-10 w-full h-10 rounded-full bg-primary flex gap-2.5">
          <img src="/Dashboard.svg"></img>
          <h2 className="text-white">Food menu</h2>
        </Button>
        {/* black button end */}

        {/* orthers */}
        <div className="w-full h-10 mx-6 gap-2.5 flex mt-6 items-center">
          <img className="w-5.5 h-5.5" src="/Vector.svg"></img>
          <h2 className="text-black">Orders</h2>
        </div>
        {/* orthers end*/}

        {/* settings */}
        <div className="w-full h-10 mx-6 gap-2.5 flex mt-6 items-center">
          <img className="w-5.5 h-5.5" src="/Vector2.svg"></img>
          <h2 className="text-black">Settings</h2>
        </div>
        {/* settings end*/}
      </div>
    </div>
  );
}
