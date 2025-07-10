const useTitle = () => {
  const title = ref('')
  const setTitle = (value: string) => {
    title.value = value
  }

  return { title, setTitle }
}

export default useTitle
