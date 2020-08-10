const addTap =  (setFunction: React.Dispatch<React.SetStateAction<string>>) => (e:string) => {
    setFunction(e);
};



export default addTap