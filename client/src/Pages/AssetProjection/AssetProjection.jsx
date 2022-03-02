import SingleAssetProjection from "../../Components/SingleAssetProjection";
import TotalAssetProjection from "../../Components/TotalAssetProjection";

function AssetProjection(props) {
  return (
    <>
      <SingleAssetProjection
        addAssets={props.addAssets}
        assets={props.assets}
      />
      <TotalAssetProjection
        addAssets={props.addAssets}
        assets={props.assets}
      />
    </>
  );
}

export default AssetProjection;
