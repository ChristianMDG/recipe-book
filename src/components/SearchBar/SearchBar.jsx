import styles from './SearchBar.module.css';
function SearchBar(props) {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(event) => {props.onSearch(event.target.value)}}
      />
    </div>
  );
}

export default SearchBar;
