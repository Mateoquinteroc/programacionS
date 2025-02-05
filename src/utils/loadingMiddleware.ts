export async function withLoading<T>(
    asyncFunction: () => Promise<T>,
    setLoading: (loading: boolean) => void
  ): Promise<T> {
    try {
      setLoading(true); // ✅ Inicia la carga
      const result = await asyncFunction();
      return result;
    } finally {
      setLoading(false); // ✅ Finaliza la carga
    }
  }
  