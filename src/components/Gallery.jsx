import Card from "./ui/Card";

export default function Gallery({ photos, onOpen }) {
  return (
    <Card>
      <h3 className="section-title mb-4 text-2xl font-semibold">Nossa galeria</h3>
      <p className="mb-4 text-sm text-rose-wine/85">
        Toque em uma foto para abrir no modo ampliado.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={`${photo}-${index}`}
            type="button"
            className="focus-ring overflow-hidden rounded-2xl border border-rose-main/20"
            onClick={() => onOpen(index)}
            aria-label={`Abrir foto ${index + 1}`}
          >
            <img
              src={photo}
              alt={`Nossa foto ${index + 1}`}
              className="aspect-[4/5] w-full object-cover transition duration-300 hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </Card>
  );
}
