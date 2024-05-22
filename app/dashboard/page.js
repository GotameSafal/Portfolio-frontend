import { fetchprojects } from "@components/Apis";
import { DeleteButton, EditButton, NewProject } from "@components/Clients";

const page = async () => {
  const data = await fetchprojects();
  
  return (
    <section className='mb-6'>
      <div className="max-w-screen-xl mx-auto">
        <div className="p-6 overflow-scroll px-0">
          <h2 className="font-semibold text-lg my-2">Projects</h2>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Project Name
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Project Id
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
                    Action
                  </p>
                </th>
                <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70"></p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.projects?.map((item, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        {item.name}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      {item._id}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <EditButton id={item._id}/>
                    <DeleteButton  id={item._id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <NewProject/>
      </div>
    </section>
  );
};

export default page;
