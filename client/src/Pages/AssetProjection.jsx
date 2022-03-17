import SingleAssetProjection from "./SingleAssetProjection";


function AssetProjection(props) {
  return (
    <>
      <SingleAssetProjection
        addAssets={props.addAssets}
        assets={props.assets}
      />
      
    </>
  );
}

export default AssetProjection;
