{ pkgs }: {
  deps = [
    pkgs.python39Full
    pkgs.python39Packages.pip
    pkgs.python39Packages.numpy
    pkgs.python39Packages.pandas
    pkgs.python39Packages.scikit-learn
    pkgs.python39Packages.matplotlib
    pkgs.python39Packages.opencv4
    pkgs.gcc
    pkgs.libGL
  ];
}