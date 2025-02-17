type Props = {
  name: string;
  buttonComponent?: any;
  isSmallText?: boolean;
};
function Header({ name, buttonComponent, isSmallText }: Props) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <div
        className={`${
          isSmallText ? "text-lg" : "text-2xl"
        } font-bold dark:text-white`}
      >
        {name}
      </div>
      {buttonComponent}
    </div>
  );
}

export default Header;
