"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ReactFlow, {
  type Edge,
  type Node,
  type NodeProps,
  Position,
  Handle,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import "./organisasi.css";

type OrgTreeNode = {
  id: string;
  label: string;
  className: string;
  deptId?: string;
  children?: OrgTreeNode[];
};

const ROOT_SIBLING = {
  id: "ketua-kmb-bem-ikm-fk-ui",
  label: "Ketua KMB BEM IKM FK UI",
  className:
    "bg-[#313aa3] text-white w-[240px] md:w-[300px] h-[110px] md:h-[120px] px-7 rounded-lg font-semibold shadow-md text-xl md:text-2xl text-center leading-tight scale-110 origin-center flex items-center justify-center",
} as const;

const DEPARTMENTS = [
  {
    id: "bph",
    name: "Badan Pengurus Harian (BPH)",
    description:
      "Kepengurusan inti atau Badan Pengurus Harian terdiri dari Koordinator Internal, Bendahara Umum, Ketua Umum, Sekretaris Umum, dan Koordinator Eksternal.",
  },
  {
    id: "kalyanamitta",
    name: "Kalyanamitta",
    description:
      "Departemen Kalyanamitta berperan dalam mengenalkan dan mengembangkan praktik Dhamma yang diajarkan oleh Sang Buddha. Program-programnya dirancang agar menyenangkan, bermanfaat, serta dapat meningkatkan kebijaksanaan anggota KMBUI. Kegiatan yang dilakukan antara lain Puja Rutin dan Pembinaan Pengembangan Dhamma atau PPD.",
  },
  {
    id: "pengsos",
    name: "Pengembangan Sosial (Pengsos)",
    description:
      "Departemen Pengembangan Sosial atau Pengsos menjadi roda penggerak dalam menumbuhkan rasa kemanusiaan, mewujudkan Dhamma dalam kehidupan, dan menumbuhkan cinta kasih kepada sesama. Departemen ini menjadi wadah bagi anggota KMBUI dalam menumbuhkan kepedulian dan melakukan pengabdian kepada masyarakat. Program kerja yang dijalankan adalah UI Berbagi, Socio Care, Care n Give, serta kegiatan paruh kedua berupa pencarian desa pengabdian dan penyusunan laporan pengembangan sosial.",
  },
  {
    id: "creative-events",
    name: "Creative Events",
    description:
      "Departemen Acara Kreatif atau Creative Events merupakan wadah untuk mempererat hubungan dan membangun kebersamaan antar anggota KMBUI melalui kegiatan kreatif dan inovatif. Program kerjanya meliputi Birthday Chronicle, KMBUI Challenge, Gathering, dan KMBUI Fest.",
  },
  {
    id: "rnd",
    name: "Research and Development (RnD)",
    description:
      "Departemen Penelitian dan Pengembangan atau Research and Development memiliki tugas mengembangkan kemampuan sumber daya manusia serta memantau kinerja dan kualitas individu maupun program kerja di dalam KMBUI. Program kerjanya adalah Kelompok Studi Buddhis atau KOSIB, Kaderisasi Anggota Menjadi Pemimpin yang Terampil dan Mandiri atau KAMERY, Kepemimpinan Pengurus Guna Optimalisasi Organisasi atau KPGO, Apresiasi Program dan Proker Outstanding atau APPRO, Program Magang KMBUI, serta Evaluasi dan Dokumentasi Internal atau EDI.",
  },
  {
    id: "kestari",
    name: "Kesekretariatan (Kestari)",
    description:
      "Departemen Kesekretariatan bertugas dalam pengurusan dan pelayanan administrasi untuk seluruh kebutuhan surat-menyurat, pengelolaan dan perawatan inventaris, pengelolaan sekretariat KMBUI, agenda program kerja dari setiap departemen, serta penyusunan dan pemeliharaan database anggota. Program kerja Departemen Kesekretariatan antara lain Sistem Informasi Persuratan, Administrasi, dan Perpustakaan Digital.",
  },
  {
    id: "paramita",
    name: "PARAMITA",
    description:
      "Departemen Publikasi, Dokumentasi, dan Informasi yang dikenal dengan nama Departemen Paramita berfokus pada bidang desain, publikasi, dan informasi. Departemen ini mengelola media sosial KMBUI serta bertanggung jawab atas pembuatan dan penerbitan majalah Paramita. Program kerjanya mencakup Majalah Paramita edisi ke-59, KMBUInfo, KMBUInterlude, dan ParamitaLoka.",
  },
  {
    id: "finance",
    name: "Finance",
    description:
      "Departemen Keuangan atau Finance bertanggung jawab dalam memfasilitasi seluruh program kerja di setiap departemen melalui pengelolaan keuangan yang memadai. Departemen ini melaksanakan berbagai kegiatan penggalangan dana. Program kerjanya antara lain DonTap, penjualan merchandise, pemberian hadiah kejutan, dan Dana KMBUI.",
  },
  {
    id: "humas",
    name: "Hubungan Masyarakat (Humas)",
    description:
      "Departemen Hubungan Masyarakat atau Humas berperan sebagai wajah representatif KMBUI. Tugasnya adalah membangun dan mempertahankan hubungan dengan pihak eksternal, seperti Keluarga Mahasiswa Buddhis dari universitas lain, vihara atau cetiya, serta organisasi Buddhis lainnya. Program yang dijalankan antara lain Volundangan, Anjangsana, dan Studi Banding.",
  },
  {
    id: "halo",
    name: "HALO",
    description:
      "Departemen Hubungan Alumni dan Lintas Organisasi atau HALO berfokus pada pembangunan hubungan antara anggota aktif dengan alumni KMBUI. Selain itu, departemen ini juga menjaga komunikasi dan hubungan dengan organisasi lain yang ada di lingkungan Universitas Indonesia. Programnya mencakup Penerimaan dan Seleksi Anggota Baru, Seminar Inspiratif Wawasan Alumni dan Lintas Organisasi atau SIWALI, serta kegiatan lintas organisasi.",
  },
];

const EVENTS = [
  {
    id: "baksos",
    name: "Bakti Sosial KMBUI (Baksos)",
    description:
      "Baksos KMBUI adalah kegiatan pengabdian masyarakat dalam mengatasi permasalahan sosial dalam lingkungan masyarakat, khususnya di bidang kesehatan untuk meningkatkan kesadaran dan pengetahuan masyarakat terhadap pentingnya menjaga kesehatan.",
  },
  {
    id: "ppmb",
    name: "PPMB (Penerimaan dan Pembekalan Mahasiswa Baru)",
    description:
      "PPMB merupakan acara yang bertujuan untuk menyambut mahasiswa-mahasiswi baru UI guna memperkenalkan dan menyambut mereka sebagai anggota baru KMBUI dan kepada dunia kampus.",
  },
  {
    id: "kathina",
    name: "Kathina Puja",
    description:
      "Kathina merupakan acara yang bertujuan untuk memberikan kesempatan kepada anggota KMBUI dalam melakukan penghimpunan kebajikan yang besar bersama-sama, mempererat kekeluargaan antaranggota aktif KMBUI dan alumni, serta untuk meningkatkan perkembangan spiritual.",
  },
  {
    id: "makrab",
    name: "Malam Keakraban (Makrab)",
    description:
      "Makrab KMBUI adalah acara yang diselenggarakan oleh kepanitiaan yang tersusun atas mahasiswa baru untuk mempererat silaturahmi antara seluruh elemen KMBUI dan mendekatkan mahasiswa baru sebagai saudara yang harmonis.",
  },
];

const ORG_TREE: OrgTreeNode = {
  id: "ketua-umum",
  label: "Ketua Umum",
  className:
    "bg-[#313aa3] text-white w-[240px] md:w-[300px] h-[110px] md:h-[120px] px-7 rounded-lg font-semibold shadow-md text-xl md:text-2xl text-center leading-tight scale-110 origin-center flex items-center justify-center",
  children: [
    {
      id: "internal",
      label: "Internal",
      className:
        "bg-[#4a52b8] text-white w-[220px] md:w-[270px] px-6 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight scale-110 origin-center",
      children: [
        {
          id: "kalyanamitta",
          label: "Kalyanamitta",
          deptId: "kalyanamitta",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
        {
          id: "pengsos",
          label: "Pengsos",
          deptId: "pengsos",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
        {
          id: "creative-events",
          label: "Creative Events",
          deptId: "creative-events",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
        {
          id: "rnd",
          label: "Rnd",
          deptId: "rnd",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
      ],
    },
    {
      id: "sekretaris-umum",
      label: "Sekretaris Umum",
      className:
        "bg-[#4a52b8] text-white w-[220px] md:w-[270px] px-6 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight scale-110 origin-center",
      children: [
        {
          id: "kestari",
          label: "Kestari",
          deptId: "kestari",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
      ],
    },
    {
      id: "bendahara-umum",
      label: "Bendahara Umum",
      className:
        "bg-[#4a52b8] text-white w-[220px] md:w-[270px] px-6 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight scale-110 origin-center",
      children: [
        {
          id: "paramita",
          label: "PARAMITA",
          deptId: "paramita",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
        {
          id: "finance",
          label: "Finance",
          deptId: "finance",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
      ],
    },
    {
      id: "eksternal",
      label: "Eksternal",
      className:
        "bg-[#4a52b8] text-white w-[220px] md:w-[270px] px-6 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight scale-110 origin-center",
      children: [
        {
          id: "humas",
          label: "Humas",
          deptId: "humas",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
        {
          id: "halo",
          label: "HALO",
          deptId: "halo",
          className:
            "bg-[#6b73d1] text-white w-[210px] md:w-[260px] px-5 py-5 rounded-lg font-semibold shadow-md text-lg md:text-xl text-center leading-tight hover:bg-[#7a82d9] transition-colors scale-110 origin-center",
        },
      ],
    },
  ],
};

export default function OrganisasiPage() {
  const [selectedDept, setSelectedDept] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [deptAnim, setDeptAnim] = useState("");
  const [eventAnim, setEventAnim] = useState("");
  const deptAnimTimer = useRef<number | null>(null);
  const eventAnimTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (deptAnimTimer.current) window.clearTimeout(deptAnimTimer.current);
      if (eventAnimTimer.current) window.clearTimeout(eventAnimTimer.current);
    };
  }, []);

  const triggerDept = (dir: "prev" | "next") => {
    if (DEPARTMENTS.length === 0) return;
    setDeptAnim(dir === "next" ? "animate-carousel-next" : "animate-carousel-prev");
    setSelectedDept((prev) => (dir === "next" ? (prev === DEPARTMENTS.length - 1 ? 0 : prev + 1) : (prev === 0 ? DEPARTMENTS.length - 1 : prev - 1)));
    if (deptAnimTimer.current) window.clearTimeout(deptAnimTimer.current);
    deptAnimTimer.current = window.setTimeout(() => setDeptAnim(""), 340);
  };

  const triggerEvent = (dir: "prev" | "next") => {
    if (EVENTS.length === 0) return;
    setEventAnim(dir === "next" ? "animate-carousel-next" : "animate-carousel-prev");
    setSelectedEvent((prev) => (dir === "next" ? (prev === EVENTS.length - 1 ? 0 : prev + 1) : (prev === 0 ? EVENTS.length - 1 : prev - 1)));
    if (eventAnimTimer.current) window.clearTimeout(eventAnimTimer.current);
    eventAnimTimer.current = window.setTimeout(() => setEventAnim(""), 340);
  };

  const getDeptCardTitle = (name: string) => {
    const match = name.match(/\(([^)]+)\)/);
    if (match?.[1]) return match[1];
    return name;
  };

  const getPairIndices = (total: number, start: number) => {
    if (total <= 0) return [0, 0] as const;
    if (total === 1) return [0, 0] as const;
    const first = ((start % total) + total) % total;
    const second = (first + 1) % total;
    return [first, second] as const;
  };

  const scrollToDepartment = useCallback(
    (deptId: string) => {
      const index = DEPARTMENTS.findIndex((d) => d.id === deptId);
      if (index !== -1) {
        setSelectedDept(index);
        const element = document.getElementById("departments-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    },
    [setSelectedDept]
  );

  const nodeTypes = useMemo(() => {
    const OrgNode = ({ data }: NodeProps<{ label: string; className: string; onClick?: () => void }>) => (
      <div
        className={data.className}
        onClick={data.onClick}
        style={{ cursor: data.onClick ? "pointer" : "default" }}
      >
        {/* Invisible handles are required for edges to render */}
        <Handle id="t" type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: "none" }} />
        <Handle id="b" type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: "none" }} />
        <Handle id="l" type="target" position={Position.Left} style={{ opacity: 0, pointerEvents: "none" }} />
        <Handle id="r" type="source" position={Position.Right} style={{ opacity: 0, pointerEvents: "none" }} />
        {data.label}
      </div>
    );

    return { orgNode: OrgNode };
  }, []);

  const { nodes: orgNodes, edges: orgEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const childrenCountById = new Map<string, number>();
    const singleChildPairs: Array<{ parentId: string; childId: string }> = [];

    const add = (node: OrgTreeNode, parentId?: string) => {
      const childCount = node.children?.length ?? 0;
      childrenCountById.set(node.id, childCount);
      if (childCount === 1 && node.children?.[0]) {
        singleChildPairs.push({ parentId: node.id, childId: node.children[0].id });
      }

      nodes.push({
        id: node.id,
        type: "orgNode",
        position: { x: 0, y: 0 },
        data: {
          label: node.label,
          className: node.className,
          onClick: node.deptId ? () => scrollToDepartment(node.deptId!) : undefined,
        },
      });

      if (parentId) {
        edges.push({
          id: `e-${parentId}-${node.id}`,
          source: parentId,
          target: node.id,
          sourceHandle: "b",
          targetHandle: "t",
          type: "smoothstep",
          style: { stroke: "#6b7280", strokeWidth: 3 },
        });
      }

      node.children?.forEach((child) => add(child, node.id));
    };

    add(ORG_TREE);

    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));
    // Slightly looser spacing so nodes don't feel cramped.
    g.setGraph({ rankdir: "TB", nodesep: 64, ranksep: 110 });

    // Keep layout dimensions conservative; the node visuals are slightly scaled.
    const nodeWidth = 240;
    const nodeHeight = 108;
    nodes.forEach((n) => g.setNode(n.id, { width: nodeWidth, height: nodeHeight }));
    edges.forEach((e) => g.setEdge(e.source, e.target));
    dagre.layout(g);

    const layoutedNodes = nodes.map((n) => {
      const pos = g.node(n.id) as { x: number; y: number } | undefined;
      return {
        ...n,
        position: pos ? { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 } : n.position,
      };
    });

    // For parents with exactly one child, align the child directly under the parent.
    // This makes the connector a perfectly straight vertical line when we use a straight edge.
    const byId = new Map(layoutedNodes.map((n) => [n.id, n] as const));
    for (const { parentId, childId } of singleChildPairs) {
      const parent = byId.get(parentId);
      const child = byId.get(childId);
      if (!parent || !child) continue;
      child.position = { ...child.position, x: parent.position.x };
    }

    const finalEdges = edges.map((e) => {
      const sourceChildren = childrenCountById.get(e.source) ?? 0;
      if (sourceChildren === 1) {
        return {
          ...e,
          type: "straight",
        };
      }
      return e;
    });

    // Add a sibling node next to the (visual) root: "Ketua Umum".
    // This sibling is positioned manually so it doesn't disturb the existing hierarchy layout.
    const ketuaNode = layoutedNodes.find((n) => n.id === ORG_TREE.id);
    if (ketuaNode) {
      const siblingNode: Node = {
        id: ROOT_SIBLING.id,
        type: "orgNode",
        position: {
          x: ketuaNode.position.x - (nodeWidth + 200),
          y: ketuaNode.position.y,
        },
        data: {
          label: ROOT_SIBLING.label,
          className: ROOT_SIBLING.className,
        },
      };

      const siblingEdge: Edge = {
        id: `e-${ROOT_SIBLING.id}-${ORG_TREE.id}`,
        source: ROOT_SIBLING.id,
        target: ORG_TREE.id,
        sourceHandle: "r",
        targetHandle: "l",
        type: "straight",
        style: { stroke: "#6b7280", strokeWidth: 3, strokeDasharray: "6 6" },
      };

      return { nodes: [...layoutedNodes, siblingNode], edges: [...finalEdges, siblingEdge] };
    }

    return { nodes: layoutedNodes, edges: finalEdges };
  }, [scrollToDepartment]);

  return (
    <>
      <main className="min-h-screen">
        <section className="bg-primary-700 px-6 md:px-12 lg:px-20 pt-16 md:pt-20 lg:pt-24">
          <div className="max-w-7xl mx-auto">
            <h1 className="h1 text-white text-center">Organisasi</h1>
            <div className="mt-5 flex justify-center">
              <Image
                src="/foto-org.png"
                alt="Foto Organisasi KMBUI"
                width={1600}
                height={800}
                priority
                className="h-auto w-full max-w-6xl object-contain animate-fade-up"
              />
            </div>
          </div>
        </section>

        <div className="bg-neutral-50 py-12">
          {/* Organization Chart Section */}
          <section>
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="sh1 text-primary-700 mb-12 text-center">Struktur Organisasi</h2>
            </div>

            <div className="px-6">
              <div
                className="bg-white rounded-2xl shadow-lg overflow-x-auto overflow-y-hidden"
              >
                <div className="p-8 lg:p-12">
                  <div className="h-[640px] w-full">
                    <ReactFlow
                      nodes={orgNodes}
                      edges={orgEdges}
                      nodeTypes={nodeTypes}
                      fitView
                      fitViewOptions={{ padding: 0.08, maxZoom: 1 }}
                      defaultEdgeOptions={{ type: "smoothstep", style: { stroke: "#6b7280", strokeWidth: 3 } }}
                      zoomOnScroll={false}
                      zoomOnPinch={false}
                      zoomOnDoubleClick={false}
                      panOnScroll={false}
                      preventScrolling={false}
                      nodesDraggable={false}
                      nodesConnectable={false}
                      elementsSelectable={false}
                      proOptions={{ hideAttribution: true }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Departemen Section (full-width without vw breakout to avoid horizontal overflow) */}
          <section
            id="departments-section"
            className="scroll-mt-24 bg-neutral-100 py-10 md:py-12 mt-16 overflow-x-hidden"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="relative">
                <div className="mb-8">
                  <h3 className="sh2 text-primary-500">Meet Our Team</h3>
                  <h2 className="sh1 text-primary-700">Departemen KMBUI</h2>
                </div>

                <div className="relative">
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${deptAnim}`}>
                    {(() => {
                      const [a, b] = getPairIndices(DEPARTMENTS.length, selectedDept);
                      const cards = [DEPARTMENTS[a], DEPARTMENTS[b]];
                      return cards.map((dept, index) => (
                        <article key={dept.id} className="dept-card rounded-2xl bg-white shadow-lg overflow-hidden">
                          <div className="relative h-32">
                            <div className="absolute inset-0 bg-neutral-100" />
                            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-primary-700/60" />
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-primary-700/70" />
                          </div>

                          <div
                            className={`dept-card__body relative px-6 pb-6 pt-8 ${index === 0 ? "pl-8" : ""} ${index === 1 ? "pr-8" : ""}`}
                          >
                            <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-primary-700 ring-4 ring-white" />
                            <h3 className="text-lg font-semibold text-gray-900">{getDeptCardTitle(dept.name)}</h3>
                            <p className="dept-card__desc mt-2 text-sm text-gray-700 leading-relaxed text-justify">
                              {dept.description}
                            </p>
                          </div>
                        </article>
                      ));
                    })()}
                  </div>

                  <button
                    onClick={() => triggerDept("prev")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Previous department"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => triggerDept("next")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Next department"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-6 mt-16 overflow-x-hidden">
            {/* Program Kerja Section */}
            <section id="kepanitiaan-section" className="scroll-mt-24">
              <div className="relative">
                <div className="mb-8">
                  <h2 className="sh1 text-primary-700">Program Kerja</h2>
                </div>

                <div className="relative">
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${eventAnim}`}>
                    {(() => {
                      const [a, b] = getPairIndices(EVENTS.length, selectedEvent);
                      const cards = [EVENTS[a], EVENTS[b]];
                      return cards.map((event) => (
                        <article key={event.id} className="rounded-2xl bg-white shadow-lg overflow-hidden">
                          <div className="relative h-56 md:h-64">
                            <div className="absolute inset-0 bg-neutral-100" />
                            <div className="absolute inset-0 bg-black/35" />
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-primary-700" />

                            <div className="absolute inset-x-0 bottom-5 px-6">
                              <p className="text-center text-white font-semibold leading-snug">
                                {event.name}
                              </p>
                            </div>
                          </div>
                        </article>
                      ));
                    })()}
                  </div>

                  <button
                    onClick={() => triggerEvent("prev")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Previous program kerja"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={() => triggerEvent("next")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-primary-700 text-white shadow-lg grid place-items-center"
                    aria-label="Next program kerja"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
