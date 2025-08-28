import Link from "next/link";

export default function AreasIndex() {
  const areas = [{"name":"Ashok Nagar","slug":"ashok-nagar"},{"name":"Banashankari","slug":"banashankari"},{"name":"Bannerghatta Road","slug":"bannerghatta-road"},{"name":"Basavanagudi","slug":"basavanagudi"},{"name":"Bellandur","slug":"bellandur"},{"name":"BTM Layout","slug":"btm-layout"},{"name":"Domlur","slug":"domlur"},{"name":"Electronic City","slug":"electronic-city"},{"name":"Hebbal","slug":"hebbal"},{"name":"HSR Layout","slug":"hsr-layout"},{"name":"Indiranagar","slug":"indiranagar"},{"name":"Jayanagar","slug":"jayanagar"},{"name":"JP Nagar","slug":"jp-nagar"},{"name":"Kanakapura Road","slug":"kanakapura-road"},{"name":"Koramangala","slug":"koramangala"},{"name":"Malleshwaram","slug":"malleshwaram"},{"name":"Marathahalli","slug":"marathahalli"},{"name":"Mathikere","slug":"mathikere"},{"name":"Peenya","slug":"peenya"},{"name":"Rajajinagar","slug":"rajajinagar"},{"name":"Richmond Town","slug":"richmond-town"},{"name":"RT Nagar","slug":"rt-nagar"},{"name":"Sahakarnagar","slug":"sahakarnagar"},{"name":"Sarjapur Road","slug":"sarjapur-road"},{"name":"Ulsoor","slug":"ulsoor"},{"name":"Vijayanagar","slug":"vijayanagar"},{"name":"Whitefield","slug":"whitefield"},{"name":"Yelahanka","slug":"yelahanka"},{"name":"Yeshwanthpur","slug":"yeshwanthpur"}];
  return (
    <main className="prose prose-invert max-w-none">
      <h1>Event Decoration Across Bangalore — Areas We Serve</h1>
      <p>Explore our coverage across South, East, North, Central and West Bengaluru. Each area page includes local service details, photos and quick booking options.</p>
      <ul>
        {areas.map(a => (
          <li key={a.slug}>
            <Link href={"/areas/" + a.slug}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
