
import { Link } from "react-router-dom";

export default function FeatureCard({ title, description, link }) {
  return (
    <Link
      to={link}
      className="block bg-gray-800 bg-opacity-50 border border-gray-700 rounded-xl p-6 shadow hover:shadow-2xl transition-colors duration-300"
    >
      <h3 className="text-xl font-bold text-green-400 mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <span className="text-emerald-400 font-semibold hover:underline inline-block">
        Learn More →
      </span>
    </Link>
  );
}
