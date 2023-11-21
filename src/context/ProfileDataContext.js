import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../context/CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    // we will use the pageProfile later!
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

// import { createContext, useContext, useEffect, useState } from "react";
// import { useCurrentUser } from "./CurrentUserContext";
// import { axiosReq } from "../api/axiosDefaults";
// import axios from "axios";

// export const ProfileDataCntxt = createContext();
// export const SetProfileDataCntxt = createContext();
// export const IsLoadedContext = createContext();

// export const useProfileDataCntxt = () => useContext(ProfileDataCntxt);
// export const useSetProfileDataCntxt = () => useContext(SetProfileDataCntxt);
// export const useIsLoadedContext = () => useContext(IsLoadedContext);

// export const ProfileDataProvider = ({ children }) => {
//   const [profileData, setProfileData] = useState({
//     //use this for page profile later
//     pageProfile: { results: [] },
//     popularProfiles: { results: [] },
//   });

//   const [isLoaded, setIsLoaded] = useState(false);
//   const currentUser = useCurrentUser();
//   useEffect(() => {
//     const handleMount = async () => {
//       try {
//         const { data } = await axiosReq.get(
//           `/profiles/?ordering=-followers_count`
//         );
//         console.log(data);
//         setProfileData((prevState) => ({
//           ...prevState,
//           popularProfiles: data,
//         }));
//         setIsLoaded(true);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     handleMount();
//   }, [currentUser]);

//   return (
//     <ProfileDataCntxt.Provider value={profileData}>
//       <SetProfileDataCntxt.Provider value={setProfileData}>
//         <IsLoadedContext.Provider value={isLoaded}>
//           {children}
//         </IsLoadedContext.Provider>
//       </SetProfileDataCntxt.Provider>
//     </ProfileDataCntxt.Provider>
//   );
// };
