
function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(event) => {props.onSearch(event.target.value)}}
      />
    </div>
  );
}

export default SearchBar;
