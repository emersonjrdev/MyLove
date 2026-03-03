import { Heart } from "lucide-react";
import Card from "./ui/Card";

export default function Timeline({ items }) {
  return (
    <Card className="reveal-on-scroll" data-visible="true" aria-label="Linha do tempo do casal">
      <h3 className="section-title mb-4 text-2xl font-semibold">Linha do tempo</h3>
      <ol className="relative border-s border-rose-main/30 ps-5">
        {items.map((item, index) => (
          <li key={item.title + index} className="mb-6 last:mb-0">
            <span className="absolute -start-[10px] mt-1 rounded-full bg-rose-main p-1 text-white" aria-hidden="true">
              <Heart size={10} fill="currentColor" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-main">{item.date}</p>
            <p className="font-romantic text-xl text-wine-dark">{item.title}</p>
            <p className="text-sm text-rose-wine/90">{item.description}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
