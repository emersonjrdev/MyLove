import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
}) {
  const image = images[currentIndex];
  if (!isOpen || !image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Foto ${currentIndex + 1} de ${images.length}`}
      labelledBy="lightbox-title"
      describedBy="lightbox-body"
    >
      <div className="space-y-4">
        <img
          src={image}
          alt={`Foto ampliada ${currentIndex + 1}`}
          className="h-[55vh] w-full rounded-2xl object-cover"
        />
        <div className="flex items-center justify-between gap-3">
          <Button type="button" variant="soft" onClick={onPrev} aria-label="Foto anterior">
            <ChevronLeft size={16} />
          </Button>
          <p className="text-sm text-rose-wine/80">Use as setas para navegar</p>
          <Button type="button" variant="soft" onClick={onNext} aria-label="Próxima foto">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
