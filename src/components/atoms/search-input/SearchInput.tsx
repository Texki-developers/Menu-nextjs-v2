import { Search } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

interface SearchInputProps {
    inputProps?: InputProps;
    containerProps?: ContainerProps;
    icon?: React.ReactNode;
}

const SearchInput = ({ inputProps, containerProps, icon }: SearchInputProps) => {
    return (
        <div
            className="w-full relative"
            {...containerProps}>
            <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 border placeholder:text-lg placeholder:text-[#5a5a5a] rounded-2xl outline-none text-lg border-gray-300"
                {...inputProps}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{icon || <Search />}</div>
        </div>
    );
};

export default SearchInput;
