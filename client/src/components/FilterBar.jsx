export default function FilterBar({ filters, setFilters, onSearch, subjects, ageGroups }) {
  return (
    <div>
      <input
        placeholder="City"
        value={filters.city}
        onChange={e => setFilters(f => ({ ...f, city: e.target.value }))}
      />
      <input
        placeholder="ZIP"
        value={filters.zip}
        onChange={e => setFilters(f => ({ ...f, zip: e.target.value }))}
      />

      <select
        value={filters.subject}
        onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))}
      >
        <option value="">All subjects</option>
        {subjects.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={filters.ageGroup}
        onChange={e => setFilters(f => ({ ...f, ageGroup: e.target.value }))}
      >
        <option value="">All ages</option>
        {ageGroups.map(a => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min rate"
        value={filters.minRate}
        onChange={e => setFilters(f => ({ ...f, minRate: e.target.value }))}
      />
      <input
        type="number"
        placeholder="Max rate"
        value={filters.maxRate}
        onChange={e => setFilters(f => ({ ...f, maxRate: e.target.value }))}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
}
