export default function Filter({ searchTerm, setSearchTerm }) {
  const handleSearchTermChange = (event) => setSearchTerm(event.target.value);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchTermChange}
      placeholder="Search for a name"
    />
  );
}
