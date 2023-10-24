const Container = ({
  className='', 
  children,
  onClick= () => {}
}) => {
  return (
    <div 
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Container;
