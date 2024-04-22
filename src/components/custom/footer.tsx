export default function Footer() {
  return (
    <footer className="bg-gray-800 py-5">
      <p className="text-sm text-gray-400 text-center">
        CNC - Gestão &copy; 2021 - {new Date().getFullYear()}
      </p>
    </footer>
  );
}
