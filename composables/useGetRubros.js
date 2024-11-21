const { $pb } = useNuxtApp();
export const useGetRubros = () => {
  const getGrupos = async () => {
    const resultList = await $pb.collection("GrupoRubro").getFullList();
    return resultList;
  };
  const getRubros = async (value) => {
    const resultList = await $pb
      .collection("UnidadRubro")
      .getList(1, 10, { filter: `GrupoRubro = "${value}"` });
    return resultList.items;
  };
  const getRubrosMunicipio = async (value, municipio) => {
    const resultList = await $pb.collection("Avance").getList(1, 10, {
      filter: `GrupoRubro = "${value}" && municipio ="${municipio}"`,
    });
    return resultList.items;
  };

  const saveRubro = (data) => {
    data.map(async (el) => {
      const result = await $pb
        .collection("Avance")
        .create(el, { requestKey: el.TipoRubro });
    });
  };
  const deleteRubro = (data) => {
    data.map(async (el) => {
      await $pb.collection("Avance").delete(el);
    });
  };
  const getRubrosValues = async () => {
    const records = await $pb.collection("Avance").getFullList();
    return records;
  };
  const getRubrosValuesMuni = async (code) => {
    const result = $pb
      .collection("Avance")
      .getList(1, 50, { filter: `municipio = "${code}"` });

    return result;
  };

  return {
    getGrupos,
    getRubros,
    saveRubro,
    getRubrosMunicipio,
    deleteRubro,
    getRubrosValues,
    getRubrosValuesMuni,
  };
};
